import { SegmentResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const Segment: SegmentResolvers<IContext> = {
  __resolveReference({ _id }, { models }) {
    return models.Segments.findOne({ _id });
  },
};
