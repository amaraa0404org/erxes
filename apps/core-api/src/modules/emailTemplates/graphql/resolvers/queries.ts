import {
  recordPlaceholderResolver,
  renderEmailContent,
  TEmailContentFormat,
} from 'erxes-api-shared/core-modules';
import { IEmailTemplateDocument } from 'erxes-api-shared/core-types';
import { cursorPaginate } from 'erxes-api-shared/utils';
import { FilterQuery, SortOrder } from 'mongoose';
import {
  QueryEmailTemplatesArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { documentResolver } from '~/modules/documents/replacePlaceholders';

export const emailTemplateQueries: QueryResolvers<IContext> = {
  async emailTemplates(
    _root: unknown,
    params: Partial<QueryEmailTemplatesArgs>,
    { models }: IContext,
  ) {
    const { searchValue } = params;

    const filter: FilterQuery<IEmailTemplateDocument> = {};

    if (searchValue) {
      filter.$or = [
        { name: new RegExp(`.*${searchValue}.*`, 'i') },
        { description: new RegExp(`.*${searchValue}.*`, 'i') },
      ];
    }

    const { list, totalCount, pageInfo } =
      await cursorPaginate<IEmailTemplateDocument>({
        model: models.EmailTemplates,
        params: {
          limit: params.limit ?? undefined,
          cursor: params.cursor ?? undefined,
          direction: params.direction ?? undefined,
          orderBy:
            (params.orderBy as Record<string, SortOrder> | null | undefined) ||
            { createdAt: -1 },
        },
        query: filter,
      });

    return { list, totalCount, pageInfo };
  },

  /** What the written email turns into, whichever editor wrote it. */
  async emailContentPreview(
    _root: unknown,
    {
      replacerId,
      ...email
    }: {
      content?: string;
      contentFormat?: TEmailContentFormat;
      replacerId?: string;
    },
    { models, user }: IContext,
  ) {
    // Rehearsed on somebody real when one is picked: a field is only ever
    // wrong or thin against an actual record, never against nothing.
    const replacer = replacerId
      ? await models.Customers.findOne({ _id: replacerId }).lean()
      : undefined;

    return renderEmailContent(email, {
      resolvers: [
        documentResolver({
          models,
          replacerIds: replacerId ? [replacerId] : [],
          user,
        }),
        recordPlaceholderResolver(replacer || undefined),
      ],
      markMissing: true,
    });
  },

  async emailTemplateDetail(
    _root: unknown,
    { _id }: { _id: string },
    { models }: IContext,
  ) {
    return models.EmailTemplates.getEmailTemplate(_id);
  },
};
