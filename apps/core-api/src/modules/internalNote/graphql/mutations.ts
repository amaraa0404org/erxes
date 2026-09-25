import {
  graphqlPubsub,
  isEnabled,
  sendTRPCMessage,
} from 'erxes-api-shared/utils';
import {
  MutationInternalNotesEditArgs,
  MutationInternalNotesRemoveArgs,
  MutationResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import { IInternalNote } from '~/modules/internalNote/types';

/**
 * What a plugin's `<module>.generateInternalNoteNotif` hands back: the
 * notification doc it wants sent, plus the resolved content item used to look
 * up further receivers. Plugins may attach their own members.
 */
interface IInternalNoteNotifDoc {
  notifOfItems?: boolean;
  item?: unknown;
  action?: string;
  receivers?: string[];
  contentType?: string;
  [key: string]: unknown;
}

export const internalNoteMutations: MutationResolvers<IContext> = {
  /**
   * Adds internalNote object and also adds an activity log
   */
  async internalNotesAdd(
    _root,
    args: IInternalNote,
    { user, models, subdomain, checkPermission }: IContext,
  ) {
    await checkPermission('internalNotesManage');

    const { contentType, contentTypeId, mentionedUserIds = [] } = args;

    const [pluginName, moduleName] = contentType.split(':');

    const isServiceAvailable = await isEnabled(pluginName);
    if (!isServiceAvailable) {
      return null;
    }

    const notifDoc = {
      title: `${moduleName.toUpperCase()} updated`,
      createdUser: user,
      action: `mentioned you in ${contentType}`,
      receivers: mentionedUserIds,
      content: '',
      link: '',
      notifType: '',
      contentType: '',
      contentTypeId: '',
    };

    const updatedNotifDoc = await sendTRPCMessage<IInternalNoteNotifDoc>({
      subdomain,

      pluginName,
      method: 'query',
      module: moduleName,
      action: 'generateInternalNoteNotif',
      input: {
        type: moduleName,
        contentTypeId,
        notifDoc,
      },
      defaultValue: {},
    });

    if (updatedNotifDoc.notifOfItems) {
      const { item } = updatedNotifDoc;

      const relatedReceivers = await sendTRPCMessage<string[]>({
        subdomain,

        pluginName,
        method: 'query',
        module: moduleName,
        action: 'notifiedUserIds',
        input: {
          item,
        },
        defaultValue: [],
      });

      updatedNotifDoc.action = `added note in ${contentType}`;

      updatedNotifDoc.receivers = relatedReceivers.filter((id) => {
        return [...mentionedUserIds, user._id].indexOf(id) < 0;
      });

      //   sendNotificationsMessage({
      //     subdomain,
      //     action: 'send',
      //     data: updatedNotifDoc,
      //   });

      graphqlPubsub.publish('activityLogsChanged', {});
    }

    if (updatedNotifDoc.contentType) {
      //   await sendNotificationsMessage({
      //     subdomain,
      //     action: 'send',
      //     data: updatedNotifDoc,
      //   });
    }

    const note = await models.InternalNotes.createInternalNote(args, user);

    if (contentTypeId) {
      try {
        const actorData = {
          _id: user._id,
          email: user.email,
          username: user.username,
          details: user.details,
          role: user.role,
        };

        const activityLog = await models.ActivityLogs.create({
          activityType: 'internalNote',
          targetId: contentTypeId,
          targetType: contentType,
          target: { _id: contentTypeId },
          action: {
            type: 'create',
            description: 'added a note',
          },
          metadata: {
            noteId: note._id.toString(),
            content: note.content,
          },
          changes: {},
          actorType: user.role || 'user',
          actor: actorData,
        });

        graphqlPubsub.publish(
          `activityLogInserted:${subdomain}:${contentTypeId}`,
          {
            activityLogInserted: activityLog.toObject(),
          },
        );
      } catch (e) {
        console.error('Failed to create activity log for internal note', e, {
          contentTypeId,
          contentType,
        });
      }
    }

    return note;
  },

  /**
   * Updates internalNote object
   */
  async internalNotesEdit(
    _root,
    { _id, ...doc }: MutationInternalNotesEditArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('internalNotesManage');

    graphqlPubsub.publish('activityLogsChanged', {});

    // Generated args carry GraphQL nullability; the model only writes the
    // provided fields, so narrow at the boundary.
    return models.InternalNotes.updateInternalNote(
      _id,
      doc as Partial<IInternalNote>,
    );
  },

  /**
   * Removes an internal note
   */
  async internalNotesRemove(
    _root,
    { _id }: MutationInternalNotesRemoveArgs,
    { models, checkPermission }: IContext,
  ) {
    await checkPermission('internalNotesManage');

    graphqlPubsub.publish('activityLogsChanged', {});

    return models.InternalNotes.removeInternalNote(_id);
  },
};
