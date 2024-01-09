import { AbstractIdManagerUseCase } from '@core/abstracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChapterIdManagerUseCase implements AbstractIdManagerUseCase<number> {
  constructor() {}

  generateId(): number {
    return 1;
  }
}
