import { AnyResolver, ITag } from 'erxes-api-shared/core-types';
import { MutationResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

export const tagMutations: MutationResolvers<IContext> = {
  /**
   * Creates a new tag
   */
  async tagsAdd(
    _parent: unknown,
    doc: ITag,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('tagsCreate');

    return await models.Tags.createTag(doc);
  },

  /**
   * Edits a tag
   */
  async tagsEdit(
    _parent: unknown,
    { _id, ...doc }: { _id: string } & ITag,
    { models, __, checkPermission }: IContext,
  ) {
    await checkPermission('tagsUpdate');

    return await models.Tags.updateTag(_id, __(doc));
  },

  /**
   * Attach a tag
   */
  async tagsTag(
    _parent: unknown,
    {
      type,
      targetIds,
      tagIds,
    }: { type: string; targetIds: string[]; tagIds: string[] },
    { models, user, checkPermission }: IContext,
  ) {
    await checkPermission('tagsTag');

    return (await models.Tags.tagsTag(
      type,
      targetIds,
      tagIds,
      user,
    )) as unknown as Record<string, unknown>;
  },

  /**
   * Removes a tag
   */
  async tagsRemove(
    _parent: unknown,
    { _id }: { _id: string },
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('tagsDelete');

    return (await models.Tags.removeTag(
      _id,
    )) as unknown as Record<string, unknown>;
  },

  async cpTagsAdd(
    _parent: unknown,
    doc: ITag,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('tagsCreate');

    return await models.Tags.createTag(doc);
  },

  /**
   * Attach a cp tag
   */
  async cpTagsTag(
    _parent: unknown,
    {
      type,
      targetIds,
      tagIds,
    }: { type: string; targetIds: string[]; tagIds: string[] },
    { models }: IContext,
  ) {
    return (await models.Tags.tagsTag(
      type,
      targetIds,
      tagIds,
    )) as unknown as Record<string, unknown>;
  },
};

(tagMutations.cpTagsTag as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};

(tagMutations.cpTagsAdd as AnyResolver).wrapperConfig = {
  forClientPortal: true,
};
