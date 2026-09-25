import { IContext } from '~/connectionResolvers';
import { DepartmentResolvers } from '~/__generated__/graphql';

const Department: DepartmentResolvers<IContext> = {
  async __resolveReference({ _id }, { models }) {
    return models.Departments.findOne({ _id });
  },

  async users(department, _args, { models }) {
    return models.Users.findUsers({
      departmentIds: { $in: department._id },
      isActive: true,
    });
  },

  async userIds(department, _args, { models }) {
    const departmentUsers = await models.Users.findUsers({
      departmentIds: { $in: department._id },
      isActive: true,
    });

    const userIds = departmentUsers.map((user) => user._id);
    return userIds;
  },

  async userCount(department, _args, { models }) {
    return models.Users.countDocuments({
      departmentIds: { $in: department._id || [] },
      isActive: true,
    });
  },

  async parent(department, _args, { models }) {
    return models.Departments.findOne({ _id: department.parentId });
  },

  async children(department, _args, { models }) {
    return models.Departments.find({ parentId: department._id });
  },

  async childCount(department, _args, { models }) {
    return models.Departments.countDocuments({ parentId: department._id });
  },

  async supervisor(department, _args, { models }) {
    return models.Users.findOne({
      _id: department.supervisorId,
      isActive: true,
    });
  },
};

export default Department;
