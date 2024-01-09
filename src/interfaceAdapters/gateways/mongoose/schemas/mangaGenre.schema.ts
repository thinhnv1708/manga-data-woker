import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type MangaGenreDocument = MangaGenre & Document;

@Schema({
  versionKey: false,
  _id: false,
})
export class MangaGenre extends Document {
  @Prop({ type: Number })
  id: number;

  @Prop({ type: String })
  title: string;
}

const _Schema = SchemaFactory.createForClass(MangaGenre);

export const MangaGenreSchema = _Schema;
