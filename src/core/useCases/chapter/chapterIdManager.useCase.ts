import {
  AbstractIdManagerRepository,
  AbstractIdManagerUseCase,
} from '@core/abstracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChapterIdManagerUseCase implements AbstractIdManagerUseCase {
  constructor(
    private readonly idManagerRepository: AbstractIdManagerRepository,
  ) {}

  async generateId(): Promise<number> {
    const entityName = 'Chapter';
    return this.idManagerRepository.getId(entityName);
  }
}
