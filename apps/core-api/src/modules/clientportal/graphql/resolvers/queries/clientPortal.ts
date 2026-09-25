import { IClientPortalDocument } from '@/clientportal/types/clientPortal';
import { AnyResolver } from 'erxes-api-shared/core-types';
import { cursorPaginate } from 'erxes-api-shared/utils';
import {
  QueryGetClientPortalsArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const clientPortalQueries: QueryResolvers<IContext> = {
  async getClientPortals(
    _root: unknown,
    params: QueryGetClientPortalsArgs,
    { models }: IContext,
  ) {
    const { list, totalCount, pageInfo } =
      await cursorPaginate<IClientPortalDocument>({
        model: models.ClientPortal,
        params: {
          ...params,
          orderBy: { createdAt: -1 },
        },
        query: {},
      });

    return { list, totalCount, pageInfo };
  },

  async getClientPortal(
    _root: unknown,
    { _id }: { _id: string },
    { models }: IContext,
  ) {
    return models.ClientPortal.findOne({ _id });
  },

  async getCPExamplePosts() {
    const posts = [
      {
        id: '1',
        title: 'Post 1',
        content: 'Content 1',
      },
    ];
    return posts;
  },
};

(clientPortalQueries.getCPExamplePosts as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
