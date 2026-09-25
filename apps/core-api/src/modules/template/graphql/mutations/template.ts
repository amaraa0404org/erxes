import { sendTRPCMessage } from 'erxes-api-shared/utils';
import { MutationResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { templates } from '~/meta/templates';
import { ITemplate } from '../../@types';

const templateMutations: MutationResolvers<IContext> = {
  templateAdd: async (
    _root: unknown,
    doc: ITemplate,
    { user, models }: IContext,
  ) => {
    return await models.Template.createTemplate(doc, user);
  },

  templateEdit: async (
    _root: unknown,
    { _id, ...doc }: ITemplate & { _id: string },
    { user, models }: IContext,
  ) => {
    return await models.Template.updateTemplate(_id, doc, user);
  },

  templateRemove: async (
    _root: unknown,
    { _ids }: { _ids: string[] },
    { models }: IContext,
  ) => {
    const result = await models.Template.removeTemplates(_ids);

    // JSON scalar output is typed Record<string, unknown> in codegen.
    return result as unknown as Record<string, unknown>;
  },

  templateUse: async (
    _root: unknown,
    { _id }: { _id: string },
    { user, subdomain, models }: IContext,
  ) => {
    const template: ITemplate = await models.Template.getTemplate(_id);

    const { contentType = '' } = template || {};

    const [pluginName, moduleName, collectionName] = contentType.split(':');

    if (!pluginName || !moduleName) {
      throw new Error('Invalid template document');
    }

    if (pluginName === 'core') {
      const { modules } = templates || {}

      try {
        const result = await modules[moduleName][collectionName].setContent({
          template,
          models,
          user
        });

        // JSON scalar output is typed Record<string, unknown> in codegen.
        return (result ?? null) as unknown as Record<string, unknown>;
      } catch (error) {
        throw new Error(error);
      }
    }

    try {
      const result = await sendTRPCMessage<unknown>({
        subdomain,
        pluginName,
        method: 'mutation',
        module: moduleName,
        action: 'template.setContent',
        input: {
          template,
          user,
        },
        defaultValue: '',
      });

      return result as Record<string, unknown>;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default templateMutations;
