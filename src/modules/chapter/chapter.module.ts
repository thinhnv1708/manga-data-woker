import { IdGeneratorService } from '@commonUsecases/index';
import {
  AbstractChapterRepository,
  AbstractIdGeneratorService,
} from '@core/abstract';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChapterRabbitmqController } from './chapter.rabbitmq.controller';
import { ChapterFactoryService } from './chapterFactory.service';
import { ChapterManagerService } from './chapterManager.service';
import {
  Chapter,
  ChapterMapper,
  ChapterRepository,
  ChapterSchema,
} from './database/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),
  ],
  providers: [
    { provide: AbstractIdGeneratorService, useClass: IdGeneratorService },
    { provide: AbstractChapterRepository, useClass: ChapterRepository },
    ChapterMapper,
    ChapterManagerService,
    ChapterFactoryService,
  ],
  controllers: [ChapterRabbitmqController],
})
export class ChapterModule {}
