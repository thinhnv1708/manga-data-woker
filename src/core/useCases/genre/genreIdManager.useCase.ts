import {
  AbstractIdManagerRepository,
  AbstractIdManagerUseCase,
} from '@core/abstracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenreIdManagerUseCase implements AbstractIdManagerUseCase {
  constructor(
    private readonly idManagerRepository: AbstractIdManagerRepository,
  ) {}

  async generateId(): Promise<number> {
    const entityName = 'Genre';
    return this.idManagerRepository.getId(entityName);
  }
}
