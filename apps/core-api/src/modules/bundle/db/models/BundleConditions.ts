import { IBundleCondition, IBundleConditionDocument } from '@/bundle/@types';
import { bundleConditionsSchema } from '@/bundle/db/definitions/bundleCondition';
import { FilterQuery, Model } from 'mongoose';
import { IModels } from '~/connectionResolvers';

export interface IBundleConditionModel extends Model<IBundleConditionDocument> {
  getCondidtion(
    doc: FilterQuery<IBundleConditionDocument>,
  ): Promise<IBundleConditionDocument>;
  getConditionByCode(code: string): Promise<IBundleConditionDocument>;
  generateCode(code: string): string;
  createCondition(doc: IBundleCondition): Promise<IBundleConditionDocument>;
  updateCondition(
    _id: string,
    fields: IBundleCondition,
  ): Promise<IBundleConditionDocument | null>;
  removeCondition(_ids: string[]): Promise<{ deletedCount?: number }>;
}

export const loadBundleConditionClass = (
  models: IModels,
  subdomain: string,
) => {
  class BundleCondition {
    /*
     * Get a BundleCondition
     */
    public static async getCondidtion(
      doc: FilterQuery<IBundleConditionDocument>,
    ) {
      const condition = await models.BundleCondition.findOne(doc).lean();

      if (!condition) {
        throw new Error('BundleCondition not found');
      }

      return condition;
    }

    public static async createCondition(doc: IBundleCondition) {
      return await models.BundleCondition.create({
        ...doc,
        createdAt: new Date(),
      });
    }

    public static async updateCondition(_id: string, fields: IBundleCondition) {
      return models.BundleCondition.findOneAndUpdate(
        { _id },
        { $set: { ...fields } },
        { new: true },
      );
    }

    public static async removeCondition(_ids: string[]) {
      const objects = await models.BundleCondition.deleteMany({ _id: { $in: _ids } });

      if (objects.deletedCount === 0) {
        throw new Error(`BundleCondition not found with ids ${_ids.join(', ')}`);
      }

      return objects;
    }
  }

  bundleConditionsSchema.loadClass(BundleCondition);

  return bundleConditionsSchema;
};
