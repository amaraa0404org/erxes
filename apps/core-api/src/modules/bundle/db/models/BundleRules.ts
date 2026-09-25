import { IBundleRule, IBundleRuleDocument } from '@/bundle/@types';
import { bundleRuleSchema } from '@/bundle/db/definitions/bundleRule';
import { FilterQuery, Model } from 'mongoose';
import { IModels } from '~/connectionResolvers';

export interface IBundleRuleModel extends Model<IBundleRuleDocument> {
  getRule(doc: FilterQuery<IBundleRuleDocument>): Promise<IBundleRuleDocument>;
  getRuleByCode(code: string): Promise<IBundleRuleDocument>;
  generateCode(code: string): string;
  createRule(doc: IBundleRule): Promise<IBundleRuleDocument>;
  updateRule(
    _id: string,
    fields: IBundleRule,
  ): Promise<IBundleRuleDocument | null>;
  removeRule(_ids: string[]): Promise<{ deletedCount?: number }>;
}

export const loadBundleRuleClass = (models: IModels, subdomain: string) => {
  class BundleRule {
    /*
     * Get a BundleRule
     */
    public static async getRule(doc: FilterQuery<IBundleRuleDocument>) {
      const bundleRule = await models.BundleRule.findOne(doc).lean();

      if (!bundleRule) {
        throw new Error('BundleRule not found');
      }

      return bundleRule;
    }

    public static async createRule(doc: IBundleRule) {
      return await models.BundleRule.create({
        ...doc,
        createdAt: new Date(),
      });
    }

    public static async updateRule(_id: string, fields: IBundleRule) {
      return await models.BundleRule.findOneAndUpdate(
        { _id },
        { $set: { ...fields } },
        { new: true },
      );
    }

    public static async removeRule(_ids: string[]) {
      const objects = await models.BundleRule.deleteMany({ _id: { $in: _ids } });

      if (objects.deletedCount === 0) {
        throw new Error(`Bundle Rule not found with ids ${_ids.join(', ')}`);
      }

      return objects;
    }
  }

  bundleRuleSchema.loadClass(BundleRule);

  return bundleRuleSchema;
};
