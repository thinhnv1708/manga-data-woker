import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Page, PageSchema } from './page.schema';
export type ChapterDocument = Chapter & Document;
export const ChapterCollectionName = 'Chapter';

@Schema({
  timestamps: true,
  collection: ChapterCollectionName,
  versionKey: false,
})
export class Chapter extends Document {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  mangaId: string;

  @Prop({ type: Number })
  order: number;

  @Prop({ type: [PageSchema] })
  pages: Page[];

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date })
  createdAt: Date;
}

const _Schema = SchemaFactory.createForClass(Chapter);
_Schema.index({ mangaId: 1, order: 1 }, { unique: true });

export const ChapterSchema = _Schema;
