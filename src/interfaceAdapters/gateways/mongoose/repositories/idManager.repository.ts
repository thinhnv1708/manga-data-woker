import { AbstractIdManagerRepository } from '@core/abstracts';
import { IdManagerMapper } from '@interfaceAdapters/presenters/mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdManagerDocument, IdManager as MongooseIdManager } from '../schemas';

@Injectable()
export class IdManagerRepository implements AbstractIdManagerRepository {
  constructor(
    @InjectModel(MongooseIdManager.name)
    private readonly model: Model<IdManagerDocument>,
    private readonly mapper: IdManagerMapper,
  ) {}

  async getId(entityName: string): Promise<number> {
    const idManagerDocument = await this.model
      .findOneAndUpdate(
        { entityName },
        { $inc: { currentId: 1 } },
        { new: true, upsert: true },
      )
      .lean();

    return this.mapper.toEntity(idManagerDocument).getCurrentId();
  }
}
