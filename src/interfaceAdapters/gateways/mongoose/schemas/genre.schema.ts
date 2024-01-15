import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenreDocument = Genre & Document;
export const GenreCollectionName = 'Genre';

@Schema({
  timestamps: false,
  collection: GenreCollectionName,
  versionKey: false,
})
export class Genre extends Document {
  @Prop({ type: Number })
  id: number;

  @Prop({ type: String })
  path: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: Date })
  updatedAt: Date;

  @Prop({ type: Date })
  createdAt: Date;
}

const _Schema = SchemaFactory.createForClass(Genre);
_Schema.index({ id: 1 }, { unique: true });
_Schema.index({ path: 1 }, { unique: true });

export const GenreSchema = _Schema;
