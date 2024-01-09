import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ChapterMangaDocument = ChapterManga & Document;

@Schema({
  versionKey: false,
  _id: false,
})
export class ChapterManga extends Document {
  @Prop({ type: Number })
  id: number;

  @Prop({ type: String })
  title: string;
}

const _Schema = SchemaFactory.createForClass(ChapterManga);

export const ChapterMangaSchema = _Schema;
