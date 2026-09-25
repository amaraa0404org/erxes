import { PositionResolvers } from '~/__generated__/graphql';
import { IContext, IModels } from '~/connectionResolvers';

const getAllChildrenIds = async (models: IModels, parentId: string) => {
  const pipeline = [
    {
      $match: { parentId }, // Match the starting parent
    },
    {
      $graphLookup: {
        from: 'positions', // Collection name
        startWith: '$_id', // Assuming '_id' is the unique identifier
        connectFromField: '_id',
        connectToField: 'parentId',
        as: 'descendants',
        depthField: 'depth',
      },
    },
  ];

  const result = await models.Positions.aggregate<{ _id: string }>(
    pipeline,
  ).exec();

  return result.map((r) => r._id);
};

const Position: PositionResolvers<IContext> = {
  async __resolveReference({ _id }, { models }) {
    return models.Positions.findOne({ _id });
  },

  async users(position, _args, { models }) {
    const allChildrenIds = await getAllChildrenIds(models, position._id);

    return models.Users.findUsers({
      positionIds: { $in: [position._id, ...allChildrenIds] },
      isActive: true,
    });
  },

  async parent(position, _args, { models }) {
    return models.Positions.findOne({ _id: position.parentId });
  },

  async children(position, _args, { models }) {
    return models.Positions.find({ parentId: position._id });
  },

  async supervisor(position, _args, { models }) {
    return models.Users.findOne({ _id: position.supervisorId, isActive: true });
  },

  async userIds(position, _args, { models }) {
    const allChildrenIds = await getAllChildrenIds(models, position._id);

    const positionedUsers = await models.Users.findUsers({
      positionIds: { $in: [position._id, ...allChildrenIds] },
      isActive: true,
    });

    const userIds = positionedUsers.map((user) => user._id);
    return userIds;
  },
  async userCount(position, _args, { models }) {
    const allChildrenIds = await getAllChildrenIds(models, position._id);

    return await models.Users.countDocuments({
      positionIds: { $in: [position._id, ...allChildrenIds] },
      isActive: true,
    });
  },
};

export default Position;
