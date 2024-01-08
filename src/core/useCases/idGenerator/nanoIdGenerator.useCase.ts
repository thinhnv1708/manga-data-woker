import { AbstractIdGeneratorUseCase } from '@core/abstracts';
import { Injectable } from '@nestjs/common';
import * as nanoid from 'nanoid';

@Injectable()
export class NanoIdGeneratorUseCase implements AbstractIdGeneratorUseCase {
  generate(): string {
    return nanoid.nanoid();
  }
}
