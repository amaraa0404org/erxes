import { INotificationDocument } from 'erxes-api-shared/core-modules';
import { FilterQuery } from 'mongoose';

type TNotificationFilterParams = {
  ids?: Array<string | null> | null;
  status?: string | null;
  priority?: string | null;
  type?: string | null;
  fromDate?: string | null;
  endDate?: string | null;
  module?: string | null;
  fromUserId?: string | null;
};

export const generateNotificationsFilter = (
  params: TNotificationFilterParams = {},
): FilterQuery<INotificationDocument> => {
  const { status = '', priority, type, ids = [] } = params || {};
  const filter: Record<string, unknown> = {};

  if (ids?.length) {
    filter._id = { $nin: ids };
  }

  if (status?.toLowerCase() === 'read') {
    filter.isRead = true;
  }

  if (status?.toLowerCase() === 'unread') {
    filter.isRead = false;
  }

  if (priority) {
    filter.priority = priority.toLowerCase();
  }

  if (type) {
    filter.type = type.toLowerCase();
  }

  if (params?.fromDate) {
    filter.createdAt = { $gte: params.fromDate };
  }

  if (params?.endDate) {
    filter.createdAt = {
      ...(filter.createdAt as Record<string, unknown>),
      $lte: params.endDate,
    };
  }

  if (params?.fromUserId) {
    filter.fromUserId = params.fromUserId;
  }

  if (params?.module === 'approval') {
    filter.contentType = 'core:approval';
  }

  return filter as FilterQuery<INotificationDocument>;
};
