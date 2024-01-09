import { IdManager } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { IdManagerDocument } from '../../gateways/mongoose/schemas';

@Injectable()
export class IdManagerMapper {
  /**
   * Maps a idManager document to a idManager entity
   */
  toEntity(idManagerDocument: IdManagerDocument): IdManager {
    if (!idManagerDocument) {
      return null;
    }

    const { entityName, currentId } = idManagerDocument;
    const newIdManager = new IdManager(entityName, currentId);

    return newIdManager;
  }
}
