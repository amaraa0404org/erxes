import { Document } from 'mongoose';

export interface IProductsConfig {
  code: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any — config value
  // shape is variant-typed per `code` in the owning service
  value: any;
}

export interface IProductsConfigDocument extends IProductsConfig, Document {
  _id: string;
}
