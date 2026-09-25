import { initTRPC } from '@trpc/server';
import { INotificationDocument } from 'erxes-api-shared/core-modules';
import { getEnv, graphqlPubsub, USER_ROLES } from 'erxes-api-shared/utils';
import * as admin from 'firebase-admin';
import { z } from 'zod';
import { CoreTRPCContext } from '~/init-trpc';
import { PRIORITY_ORDER } from '~/modules/notifications/constants';
import { initFirebase } from '~/modules/notifications/utils';
import { sendEmail } from '~/utils/email';

const t = initTRPC.context<CoreTRPCContext>().create();

const mongoQuerySchema = z.record(z.unknown());

const sendEmailInputSchema = z.object({
  toEmails: z.array(z.string()).optional(),
  fromEmail: z.string().optional(),
  title: z.string().optional(),
  customHtml: z.string().optional(),
  customHtmlData: z.unknown().optional(),
  template: z
    .object({
      name: z.string().optional(),
      data: z.record(z.unknown()).optional(),
    })
    .optional(),
  attachments: z.array(z.record(z.unknown())).optional(),
  transportMethod: z.string().optional(),
  userId: z.string().optional(),
});

export const notificationTrpcRouter = t.router({
  notifications: t.router({
    create: t.procedure
      .input(
        z.object({
          userIds: z.array(z.string()).optional(),
          data: mongoQuerySchema.optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
      const { userIds = [], data } = input;
      const { models, subdomain } = ctx;

      const { kind, allowMultiple, contentType, contentTypeId, priority } =
        data || {};

      for (const userId of userIds) {
        let notification: INotificationDocument | null = null;

        const notificationDoc = {
          ...data,
          userId,
          isRead: false,
          priorityLevel:
            PRIORITY_ORDER[
              (priority || 'medium') as keyof typeof PRIORITY_ORDER
            ],
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        };

        if (kind === 'user' && !allowMultiple) {
          // avoiding duplicate notifications for the same user and content.
          // Update existing notification
          notification = await models.Notifications.findOneAndUpdate(
            { contentTypeId, contentType, userId }, // lookup key
            notificationDoc, // new values
            { new: true, upsert: true }, // update if exists, insert if not
          );
        }

        if (!notification) {
          // Create new notification
          notification = await models.Notifications.create(notificationDoc);
        }

        if (notification) {
          // Publish the notification event
          graphqlPubsub.publish(`notificationInserted:${subdomain}:${userId}`, {
            notificationInserted: { ...notification.toObject() },
          });
        }
      }

      return models.Notifications.find({ userId: { $in: userIds } }).lean();
    }),

    sendEmail: t.procedure
      .input(sendEmailInputSchema)
      .mutation(async ({ ctx, input }) => {
      const { subdomain, models } = ctx;

      const DOMAIN = getEnv({ name: 'DOMAIN', subdomain });

      // for unsubscribe url
      const modifier = async (data: Record<string, unknown>, email: string) => {
        const user = await models.Users.findOne({ email }).lean();

        if (!user) {
          return;
        }

        data.uid = user._id;

        const userNotification = await models.Notifications.findOne({
          userId: user._id,
        }).lean();

        if (
          userNotification &&
          data.notification &&
          typeof data.notification === 'object'
        ) {
          (data.notification as Record<string, unknown>).link =
            `${DOMAIN}/my-inbox/${userNotification._id}`;
        }
      };

      await sendEmail(subdomain, { ...input, modifier }, models);
    }),

    settings: t.procedure
      .input(z.object({ userIds: z.array(z.string()) }))
      .query(async ({ ctx, input }) => {
      const { models } = ctx;
      const { userIds } = input;

      return models.NotificationSettings.find({ userId: { $in: userIds } });
    }),
    sendMobileNotification: t.procedure
      .input(
        z.object({
          receivers: z.array(z.string()).optional(),
          deviceTokens: z.array(z.string()).optional(),
          title: z.string().optional(),
          body: z.string().optional(),
          data: z.record(z.string()).optional(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const { models } = ctx;
        const { receivers, deviceTokens, title, body, data } = input;

        if (!admin.apps.length) {
          await initFirebase(models);
        }

        const additionalConfigs = await models.Configs.findOne({
          code: 'GOOGLE_APP_ADDITIONAL_CREDS_JSON',
        });

        if (admin.apps.length === 1 && additionalConfigs) {
          for (const [index, item] of (
            additionalConfigs?.value || []
          ).entries()) {
            await initFirebase(models, item, `app${index + 1}`);
          }
        }

        const tokens: string[] = [];

        if (receivers?.length) {
          const xs = await models.Users.find({
            _id: { $in: receivers },
            role: { $ne: USER_ROLES.SYSTEM },
          }).distinct('deviceTokens');

          for (const x of xs) {
            if (x) tokens.push(x);
          }
        }

        if (deviceTokens?.length) {
          tokens.push(...deviceTokens);
        }

        if (tokens.length > 0) {
          for (const app of admin.apps) {
            if (app) {
              const transporter = app.messaging();

              for (const token of tokens) {
                await transporter
                  .send({
                    token,
                    notification: { title, body },
                    data: data || {},
                  })
                  .catch(async (e: Error) => {
                    console.error(
                      `Error occurred during firebase send: ${e.message}`,
                    );

                    if (!e.message.includes('SenderId mismatch')) {
                      await models.Users.updateOne(
                        { deviceTokens: token },
                        { $pull: { deviceTokens: token } },
                      );
                    }
                  });
              }
            }
          }
        }
      }),
  }),
});
