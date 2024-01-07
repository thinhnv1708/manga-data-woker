import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type ChapterDocument = Page & Document;

@Schema({
  versionKey: false,
  id: false,
})
export class Page extends Document {
  @Prop({ type: Number })
  position: number;

  @Prop({ type: String })
  source: string;
}

const _Schema = SchemaFactory.createForClass(Page);

export const PageSchema = _Schema;
