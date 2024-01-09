import {
  AbstractIdManagerRepository,
  AbstractIdManagerUseCase,
} from '@core/abstracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MangaIdManagerUseCase implements AbstractIdManagerUseCase {
  constructor(
    private readonly idManagerRepository: AbstractIdManagerRepository,
  ) {}

  async generateId(): Promise<number> {
    const entityName = 'Manga';
    return this.idManagerRepository.getId(entityName);
  }
}
