import { Schema, Document } from 'mongoose';

export interface Resource extends Document {
  name: string;
  type: string;
  value: string;
  creater: number;
}

export const ResourceSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: String, required: true },
    creater: { type: Number, required: true },
  },
  { timestamps: true },
);
