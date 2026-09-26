import { ITagDocument } from 'erxes-api-shared/core-types';
import { TagResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { countDocuments } from '~/modules/tags/utils';

const tagResolvers: TagResolvers<IContext> = {
  async __resolveReference({ _id }, { models }) {
    return models.Tags.findOne({ _id });
  },

  async totalObjectCount(
    tag: ITagDocument,
    _args,
    { subdomain }: IContext,
  ) {

    if(!tag.type) {
      return 0;
    }

    if (tag.relatedIds && tag.relatedIds.length > 0) {
      const tagIds = tag.relatedIds.concat(tag._id);

      return countDocuments(subdomain, tag.type, tagIds);
    }

    return null;
  },

  async objectCount(
    tag: ITagDocument,
    _args,
    { subdomain }: IContext,
  ) {
    if(!tag.type) {
      return 0;
    }

    return countDocuments(subdomain, tag.type, [tag._id]);
  },
};

export default tagResolvers;
