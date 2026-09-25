import {
  AnyResolver,
  ICustomer,
  ICustomerDocument,
} from 'erxes-api-shared/core-types';
import { getEnv } from 'erxes-api-shared/utils';
import { syncCustomerContactToCPUsers } from '@/clientportal/services/user/contactService';
import {
  MutationCpCustomersAddArgs,
  MutationCustomersAddArgs,
  MutationCustomersChangeStateArgs,
  MutationCustomersChangeStateBulkArgs,
  MutationCustomersChangeVerificationStatusArgs,
  MutationCustomersEditArgs,
  MutationCustomersMergeArgs,
  MutationCustomersRemoveArgs,
  MutationCustomersVerifyArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { COC_LIFECYCLE_STATE_TYPES } from '~/modules/contacts/constants';

export const customerMutations: MutationResolvers<IContext> = {
  /**
   * Create new customer also adds Customer registration log
   */
  async customersAdd(
    _parent,
    doc: MutationCustomersAddArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('contactsCreate');

    const customer = await models.Customers.createCustomer(doc as ICustomer);

    return customer;
  },

  async cpCustomersAdd(
    _parent,
    doc: MutationCpCustomersAddArgs,
    { models, clientPortal }: IContext,
  ) {
    return await models.Customers.createCustomer({
      ...doc,
      clientPortalId: clientPortal?._id,
    } as ICustomer);
  },
  /**
   * Updates a customer
   */
  async customersEdit(
    _parent,
    { _id, ...doc }: MutationCustomersEditArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('contactsUpdate');

    const updated = await models.Customers.updateCustomer(
      _id,
      doc as ICustomer,
    );

    await syncCustomerContactToCPUsers(models, _id, doc as ICustomer);

    return updated;
  },

  /**
   * Remove customers
   */
  async customersRemove(
    _parent,
    { customerIds }: MutationCustomersRemoveArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('contactsDelete');

    const customers: ICustomerDocument[] = await models.Customers.find({
      _id: { $in: customerIds },
    });

    await models.Customers.removeCustomers(customerIds);

    let relatedIntegrationIds: string[] = [];
    let mergedIds: string[] = [];

    for (const c of customers) {
      if (c.relatedIntegrationIds && c.relatedIntegrationIds.length > 0) {
        relatedIntegrationIds = relatedIntegrationIds.concat(
          c.relatedIntegrationIds,
        );
      }
      if (c.mergedIds && c.mergedIds.length > 0) {
        mergedIds = mergedIds.concat(c.mergedIds);
      }
    }

    relatedIntegrationIds = [...new Set(relatedIntegrationIds)];
    mergedIds = [...new Set(mergedIds)];

    return customerIds;
  },

  /**
   * Change state
   */
  async customersChangeState(
    _parent,
    args: MutationCustomersChangeStateArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('contactsUpdate');

    return models.Customers.changeState(args._id, args.value);
  },

  /**
   * Merge customers
   */
  async customersMerge(
    _parent,
    { customerIds, customerFields }: MutationCustomersMergeArgs,
    { user, models, checkPermission }: IContext,
  ) {
    await checkPermission('contactsMerge');

    return models.Customers.mergeCustomers(
      customerIds,
      (customerFields ?? {}) as ICustomer,
      user,
    );
  },

  async customersVerify(
    _parent,
    { verificationType }: MutationCustomersVerifyArgs,
    { models, subdomain, checkPermission }: IContext,
  ) {
    await checkPermission('contactsUpdate');

    const EMAIL_VERIFIER_ENDPOINT = getEnv({
      name: 'EMAIL_VERIFIER_ENDPOINT',
      defaultValue: 'http://localhost:4100',
    });

    const DOMAIN = getEnv({ name: 'DOMAIN' })
      ? `${getEnv({ name: 'DOMAIN' })}/gateway`
      : 'http://localhost:4000';
    const domain = DOMAIN.replace('<subdomain>', subdomain);

    const callback_url = `${domain}/pl:core`;

    const BATCH_SIZE = 1000;

    const sendBatch = async (data: string[], type: 'email' | 'phone') => {
      // Filter out empty strings from the data array
      const filteredData = data.filter((item) => item.trim() !== '');

      if (filteredData.length === 0) {
        return; // No valid data to send, skip this batch
      }
      const endpoint = `${EMAIL_VERIFIER_ENDPOINT}/verify-bulk`;
      const body =
        type === 'email'
          ? { emails: filteredData, hostname: callback_url }
          : { phones: filteredData, hostname: callback_url };

      try {
        await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(body),
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error(
          'Verification fetch failed:',
          error instanceof Error ? error.message : 'Unknown error',
        );
        throw error;
      }
    };

    const processBatch = async (customersCursor, type: 'email' | 'phone') => {
      const batch: string[] = [];

      for await (const customer of customersCursor) {
        if (type === 'email') {
          batch.push(customer.primaryEmail);
        } else {
          batch.push(customer.primaryPhone);
        }

        if (batch.length >= BATCH_SIZE) {
          await sendBatch(batch, type);
          batch.length = 0; // Clear the batch
        }
      }

      if (batch.length > 0) {
        await sendBatch(batch, type);
      }
    };

    if (verificationType === 'email') {
      const customersCursor = models.Customers.find({
        primaryEmail: { $exists: true, $nin: [null, ''] },
        $or: [
          { emailValidationStatus: 'unknown' },
          { emailValidationStatus: { $exists: false } },
        ],
      })
        .select('primaryEmail -_id')
        .cursor();

      await processBatch(customersCursor, 'email');
    } else {
      const customersCursor = models.Customers.find({
        primaryPhone: { $exists: true, $nin: [null, ''] },
        $or: [
          { phoneValidationStatus: 'unknown' },
          { phoneValidationStatus: { $exists: false } },
        ],
      })
        .select('primaryPhone -_id')
        .cursor();

      await processBatch(customersCursor, 'phone');
    }

    return 'done';
  },

  async customersChangeVerificationStatus(
    _parent,
    args: MutationCustomersChangeVerificationStatusArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('contactsUpdate');

    return models.Customers.updateVerificationStatus(
      args.customerIds,
      args.type,
      args.status,
    );
  },

  async customersChangeStateBulk(
    _parent,
    { _ids, value }: MutationCustomersChangeStateBulkArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('contactsUpdate');

    if (!_ids || _ids.length < 1) {
      throw new Error('Customer ids can not be empty');
    }
    if (!COC_LIFECYCLE_STATE_TYPES.includes(value)) {
      throw new Error('Invalid customer state');
    }

    // Schema declares JSON; mongoose's UpdateResult is a class, so cast at
    // the scalar boundary.
    return (await models.Customers.updateMany(
      { _id: { $in: _ids } },
      { $set: { state: value } },
    )) as unknown as Record<string, unknown>;
  },
};

(customerMutations.cpCustomersAdd as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
