import { CpUnitResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const USER_FIELDS = {
  _id: 1,
  username: 1,
  email: 1,
  'details.avatar': 1,
  'details.fullName': 1,
  'details.shortName': 1,
  'details.position': 1,
  propertiesData: 1,
};

const DEPARTMENT_FIELDS = {
  _id: 1,
  title: 1,
  code: 1,
  description: 1,
};

const CPUnit: CpUnitResolvers<IContext> = {
  async users(unit, _args, { models }) {
    return models.Users.findUsers(
      {
        _id: { $in: unit.userIds || [] },
        isActive: true,
      },
      USER_FIELDS,
    );
  },

  async department(unit, _args, { models }) {
    if (!unit.departmentId) {
      return null;
    }

    return models.Departments.findOne(
      { _id: unit.departmentId },
      DEPARTMENT_FIELDS,
    );
  },
};

export default CPUnit;
