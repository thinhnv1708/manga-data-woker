import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ChapterManga, ChapterMangaSchema } from './chapterManga.schema';
import { ChapterPage, ChapterPageSchema } from './chapterPage.schema';
export type ChapterDocument = Chapter & Document;
export const ChapterCollectionName = 'Chapter';

@Schema({
  timestamps: true,
  collection: ChapterCollectionName,
  versionKey: false,
})
export class Chapter extends Document {
  @Prop({ type: Number })
  id: number;

  @Prop({ type: String })
  source: string;

  @Prop({ type: ChapterMangaSchema })
  manga: ChapterManga;

  @Prop({ type: Number })
  order: number;

  @Prop({ type: [ChapterPageSchema] })
  pages: ChapterPage[];

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date })
  createdAt: Date;
}

const _Schema = SchemaFactory.createForClass(Chapter);
_Schema.index({ id: 1 }, { unique: true });
_Schema.index({ source: 1 }, { unique: true });

export const ChapterSchema = _Schema;
