import { AbstractCrawlerRepository } from '@core/abstracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CrawlerManagerUseCase {
  constructor(private readonly crawlerRepository: AbstractCrawlerRepository) {}
}
