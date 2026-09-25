import { Document } from 'mongoose';

export interface IProductsConfig {
  code: string;
  // Config value shape is variant-typed per `code` in the owning service.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

export interface IProductsConfigDocument extends IProductsConfig, Document {
  _id: string;
}
