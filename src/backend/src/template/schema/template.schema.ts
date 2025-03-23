import { Schema, Document } from 'mongoose';

export interface Template extends Document {
  name: string;
  templateHtml: string;
  creater: number;
}

export const TemplateSchema = new Schema(
  {
    name: { type: String, required: true },
    templateHtml: { type: String, required: true },
    creater: { type: Number, required: true },
  },
  { timestamps: true },
);
