import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IdManagerDocument = IdManager & Document;
export const IdManagerCollectionName = 'IdManager';

@Schema({
  timestamps: false,
  collection: IdManagerCollectionName,
  versionKey: false,
})
export class IdManager extends Document {
  @Prop({ type: String })
  entityName: string;

  @Prop({ type: Number, default: 0 })
  currentId: number;
}

const _Schema = SchemaFactory.createForClass(IdManager);
_Schema.index({ entityName: 1 }, { unique: true });

export const IdManagerSchema = _Schema;
