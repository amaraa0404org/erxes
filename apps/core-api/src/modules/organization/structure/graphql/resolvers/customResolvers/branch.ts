import { IModels } from '~/connectionResolvers';
import { IBranchDocument } from '@/organization/structure/@types/structure';
import { BranchResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { FilterQuery } from 'mongoose';

const getAllChildrenIds = async (models: IModels, parentId: string) => {
  const pipeline = [
    {
      $match: { parentId }, // Match the starting parent
    },
    {
      $graphLookup: {
        from: 'branches', // Collection name
        startWith: '$_id', // Assuming '_id' is the unique identifier
        connectFromField: '_id',
        connectToField: 'parentId',
        as: 'descendants',
        depthField: 'depth',
      },
    },
  ];

  const result = await models.Branches.aggregate<{ _id: string }>(
    pipeline,
  ).exec();

  return result.map((r) => r._id);
};

const Branch: BranchResolvers<IContext> = {
  async __resolveReference({ _id }, { models }) {
    return models.Branches.findOne({ _id });
  },

  async users(branch, _args, { models }) {
    const allChildrenIds = await getAllChildrenIds(models, branch._id);

    return models.Users.findUsers({
      branchIds: { $in: [branch._id, ...allChildrenIds] },
      isActive: true,
    });
  },

  async parent(branch, _args, { models }) {
    return models.Branches.findOne({ _id: branch.parentId });
  },

  async children(branch, _args, { models }, { variableValues }) {
    const filter: FilterQuery<IBranchDocument> = { parentId: branch._id };

    if (typeof variableValues?.status === 'string') {
      filter.status = variableValues.status;
    }

    return models.Branches.find(filter);
  },

  async supervisor(branch, _args, { models }) {
    return models.Users.findOne({ _id: branch.supervisorId, isActive: true });
  },

  async userIds(branch, _args, { models }) {
    const allChildrenIds = await getAllChildrenIds(models, branch._id);

    const branchUsers = await models.Users.findUsers({
      branchIds: { $in: [branch._id, ...allChildrenIds] },
      isActive: true,
    });

    const userIds = branchUsers.map((user) => user._id);
    return userIds;
  },
  async userCount(branch, _args, { models }) {
    const allChildrenIds = await getAllChildrenIds(models, branch._id);

    return await models.Users.find({
      branchIds: { $in: [branch._id, ...allChildrenIds] },
      isActive: true,
    }).countDocuments();
  },
  async hasChildren({ _id }, _args, { models }) {
    return !!(await models.Branches.exists({ parentId: _id }));
  },
};

export default Branch;
