import { AbstractIdManagerUseCase } from '@core/abstracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenreIdManagerUseCase implements AbstractIdManagerUseCase<number> {
  constructor() {}

  generateId(): number {
    return 1;
  }
}
