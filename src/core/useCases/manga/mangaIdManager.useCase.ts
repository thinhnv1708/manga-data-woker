import { AbstractIdManagerUseCase } from '@core/abstracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MangaIdManagerUseCase implements AbstractIdManagerUseCase<number> {
  constructor() {}

  generateId(): number {
    return 1;
  }
}
