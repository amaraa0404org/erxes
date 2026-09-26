import { UnitResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const Unit: UnitResolvers<IContext> = {
  async users(unit, _args, { models }) {
    return models.Users.findUsers({
      _id: { $in: unit.userIds || [] },
      isActive: true,
    });
  },

  async department(unit, _args, { models }) {
    return models.Departments.findOne({ _id: unit.departmentId });
  },

  async supervisor(unit, _args, { models }) {
    return models.Users.findOne({ _id: unit.supervisorId, isActive: true });
  },

  async userCount(unit, _args, { models }) {
    return models.Users.countDocuments({
      _id: { $in: unit.userIds || [] },
      isActive: true,
    });
  },
};

export default Unit;
