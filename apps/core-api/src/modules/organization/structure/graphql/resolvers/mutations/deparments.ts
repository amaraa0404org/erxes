import { MutationResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const deparmentMutations: MutationResolvers<IContext> = {
  async departmentsAdd(_parent, doc, { user, models, checkPermission }) {
    await checkPermission('departmentsManage');

    const department = await models.Departments.createDepartment(doc, user);

    return department;
  },

  async departmentsEdit(
    _parent,
    { _id, ...doc },
    { user, models, checkPermission },
  ) {
    await checkPermission('departmentsManage');

    const department = await models.Departments.updateDepartment(
      _id,
      doc,
      user,
    );

    return department;
  },

  async departmentsRemove(_parent, { ids }, { models, checkPermission }) {
    await checkPermission('departmentsManage');

    if (!ids.length) {
      throw new Error('You must specify at least one department id to remove');
    }
    const deleteResponse = await models.Departments.removeDepartments(ids);
    return { ...deleteResponse };
  },
};
