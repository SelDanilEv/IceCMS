import { Schema, Document } from 'mongoose';

export interface Template extends Document {
  id: string;
  name: string;
  templateHtml: string;
  creater: number;
}

export const TemplateSchema = new Schema(
  {
    _id: { type: String },
    name: { type: String, required: true },
    templateHtml: { type: String, required: true },
    creater: { type: Number, required: true },
  },
  { timestamps: true },
);

TemplateSchema.virtual('id').get(function () {
  return this._id;
});

TemplateSchema.set('toJSON', { virtuals: true });