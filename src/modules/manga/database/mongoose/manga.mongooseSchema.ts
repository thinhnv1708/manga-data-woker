import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MangaDocument = Manga & Document;
export const MongodbCollectionName = 'Manga';

@Schema({
  timestamps: true,
  collection: MongodbCollectionName,
  versionKey: false,
})
export class Manga extends Document {
  @Prop({ type: String })
  id: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  subTitle: string;

  @Prop({ type: String })
  thumbnail: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [String] })
  genreIds: string[];

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

export const MangaSchema = _Schema;
