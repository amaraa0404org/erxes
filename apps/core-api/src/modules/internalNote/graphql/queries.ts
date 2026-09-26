import { sendTRPCMessage } from 'erxes-api-shared/utils';
import {
  ModifiedNote,
  QueryInternalNoteDetailArgs,
  QueryInternalNotesArgs,
  QueryInternalNotesAsLogsArgs,
  QueryInternalNotesByActionArgs,
  QueryResolvers,
} from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';
import {
  IInternalNoteDocument,
  IInternalNoteParams,
} from '~/modules/internalNote/types';

export const internalNoteQueries: QueryResolvers<IContext> = {
  internalNoteDetail: async (
    _parent,
    { _id }: QueryInternalNoteDetailArgs,
    { models }: IContext,
  ) => {
    return await models.InternalNotes.getInternalNote(_id);
  },

  /**
   * InternalNotes list
   */
  async internalNotes(
    _parent,
    { contentType, contentTypeId }: QueryInternalNotesArgs,
    { models }: IContext,
  ) {
    const filter: { contentType: string; contentTypeId?: string } = {
      contentType,
    };

    if (contentTypeId) {
      filter.contentTypeId = contentTypeId;
    }

    return await models.InternalNotes.find(filter)
      .sort({
        createdAt: 1,
      })
      .lean();
  },

  async internalNotesByAction(
    _parent,
    {
      contentType,
      pipelineId,
      page: pageArg,
      perPage: perPageArg,
    }: QueryInternalNotesByActionArgs,
    { models, subdomain }: IContext,
  ) {
    const page = pageArg ?? 1;
    const perPage = perPageArg ?? 10;
    const [pluginName, moduleName] = contentType.split(':');

    const contentIds = await sendTRPCMessage<string[]>({
      subdomain,

      pluginName,
      method: 'query',
      module: moduleName,
      action: 'contentIds',
      input: {
        pipelineId,
      },
      defaultValue: [],
    });

    let totalCount = 0;

    const filter = { contentTypeId: { $in: contentIds } };

    const list: ModifiedNote[] = [];

    const internalNotes = await models.InternalNotes.find(filter)
      .sort({
        createdAt: -1,
      })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .lean();

    for (const note of internalNotes) {
      list.push({
        _id: note._id,
        action: 'addNote',
        contentType: note.contentType,
        contentId: note.contentTypeId,
        createdAt: note.createdAt,
        createdBy: note.createdUserId,
        content: note.content,
      });
    }

    totalCount = await models.InternalNotes.countDocuments(filter);

    return { list, totalCount };
  },

  async internalNotesAsLogs(
    _parent,
    { contentTypeId }: QueryInternalNotesAsLogsArgs,
    { models }: IContext,
  ) {
    const notes = await models.InternalNotes.find({ contentTypeId })
      .sort({ createdAt: -1 })
      .lean();

    // convert to activityLog schema
    return notes.map((n) => ({
      ...n,
      contentId: contentTypeId,
      contentType: 'note',
    }));
  },
};
