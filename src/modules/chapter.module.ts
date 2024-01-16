import {
  AbstractAddJobAdapter,
  AbstractChapterRepository,
  AbstractIdManagerUseCase,
} from '@core/abstracts';
import {
  AddRetryChunkUseCase,
  ChapterFactoryUseCase,
  ChapterIdManagerUseCase,
  ChapterManagerUseCase,
  ChapterRetryUseCase,
} from '@core/useCases';
import { ChapterControllerRabbitmq } from '@interfaceAdapters/controllers/rabbitmq';
import { ChapterRepository } from '@interfaceAdapters/gateways/mongoose/repositories/chapter.repository';
import {
  Chapter,
  ChapterSchema,
} from '@interfaceAdapters/gateways/mongoose/schemas';
import { ChapterMapper } from '@interfaceAdapters/presenters/mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullInitModule } from './bullInit.module';
import { IdGeneratorModule } from './idGenerator.module';
import { MangaModule } from './manga.module';
import { RetryChapterBullConsumer } from '@interfaceAdapters/controllers/bull';
import { HandleMangaDataAdapterModule } from './handleMangaData.adpter.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),
    IdGeneratorModule,
    MangaModule,
    BullInitModule,
    HandleMangaDataAdapterModule,
  ],
  providers: [
    { provide: AbstractIdManagerUseCase, useClass: ChapterIdManagerUseCase },
    { provide: AbstractChapterRepository, useClass: ChapterRepository },
    ChapterMapper,
    ChapterManagerUseCase,
    ChapterFactoryUseCase,
    ChapterRetryUseCase,
    AddRetryChunkUseCase,
    RetryChapterBullConsumer,
  ],
  controllers: [ChapterControllerRabbitmq],
})
export class ChapterModule {}
