import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ChapterPageDocument = ChapterPage & Document;

@Schema({
  versionKey: false,
  _id: false,
})
export class ChapterPage extends Document {
  @Prop({ type: Number })
  position: number;

  @Prop({ type: String })
  path: string;
}

const _Schema = SchemaFactory.createForClass(ChapterPage);

export const ChapterPageSchema = _Schema;
