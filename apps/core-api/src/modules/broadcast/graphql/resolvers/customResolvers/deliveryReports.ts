import { IDeliveryReportsDocument } from '@/broadcast/@types';
import { IContext } from '~/connectionResolvers';
import { DeliveryReportResolvers } from '~/__generated__/graphql';

const deliveryReportResolvers: DeliveryReportResolvers<IContext> = {
  async engage(
    { engageMessageId }: IDeliveryReportsDocument,
    _args,
    { models }: IContext,
  ) {
    return models.EngageMessages.findOne(
      { _id: engageMessageId },
      { title: 1 },
    );
  },
};

export default deliveryReportResolvers;
