import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MangaGenre, MangaGenreSchema } from './mangaGenre.schema';

export type MangaDocument = Manga & Document;
export const MangaCollectionName = 'Manga';

@Schema({
  timestamps: true,
  collection: MangaCollectionName,
  versionKey: false,
})
export class Manga extends Document {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String })
  source: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  subTitle: string;

  @Prop({ type: String })
  thumbnail: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [MangaGenreSchema] })
  genres: MangaGenre[];

  @Prop({ type: Number })
  totalChapter: number;

  @Prop({ type: String })
  status: string;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date })
  createdAt: Date;
}

const _Schema = SchemaFactory.createForClass(Manga);
_Schema.index({ id: 1 }, { unique: true });
_Schema.index({ source: 1 }, { unique: true });

export const MangaSchema = _Schema;
