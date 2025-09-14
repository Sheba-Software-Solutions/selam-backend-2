import mongoose, { Schema, Document } from 'mongoose';

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  COMING_SOON = 'COMING_SOON',
  DISCONTINUED = 'DISCONTINUED',
}

export interface IProduct extends Document {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  longDescription?: string;
  features: string[];
  priceModel: string;
  status: ProductStatus;
  heroImageUrl?: string;
  gallery: string[];
  rating?: number;
  usersCount?: number;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  shortDescription: { type: String, required: true },
  longDescription: { type: String },
  features: [{ type: String }],
  priceModel: { type: String, required: true },
  status: { type: String, enum: Object.values(ProductStatus), default: ProductStatus.ACTIVE },
  heroImageUrl: { type: String },
  gallery: [{ type: String }],
  rating: { type: Number },
  usersCount: { type: Number },
  isArchived: { type: Boolean, default: false },
}, { timestamps: true });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
