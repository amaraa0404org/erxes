import { ProductPackageResolvers } from '~/__generated__/graphql';
import { IContext } from '~/connectionResolvers';

const ProductPackage: ProductPackageResolvers<IContext> = {
  async products({ products = [] }, _args, { models }) {
    if (!products.length) return [];

    const productIds = products.map((p) => p.productId);

    const productDocs = await models.Products.find({
      _id: { $in: productIds },
    }).lean();

    const byId = new Map(productDocs.map((d) => [String(d._id), d]));

    return products
      .map((p) => {
        const doc = byId.get(p.productId);
        return doc
          ? { productId: p.productId, quantity: p.quantity, product: doc }
          : null;
      })
      .filter((p): p is NonNullable<typeof p> => p != null);
  },

  async tags({ tagIds = [] }, _args, { models }) {
    if (!tagIds.length) return [];

    return models.Tags.find({ _id: { $in: tagIds } }).lean();
  },

  async totalPrice({ products = [] }, _args, { models }) {
    if (!products.length) return 0;

    const productIds = products.map((p) => p.productId);

    const docs = await models.Products.find({ _id: { $in: productIds } })
      .select({ unitPrice: 1 })
      .lean();

    const priceById = new Map(
      docs.map((d) => [String(d._id), Number(d.unitPrice) || 0]),
    );

    return products.reduce(
      (sum, p) => sum + (priceById.get(p.productId) || 0) * p.quantity,
      0,
    );
  },
};

export default ProductPackage;
