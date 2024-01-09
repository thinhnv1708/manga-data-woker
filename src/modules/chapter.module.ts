import {
  AbstractChapterRepository,
  AbstractIdManagerUseCase,
  AbstractMangaRepository,
} from '@core/abstracts';
import {
  ChapterFactoryUseCase,
  ChapterIdManagerUseCase,
  ChapterManagerUseCase,
} from '@core/useCases';
import { ChapterControllerRabbitmq } from '@interfaceAdapters/controllers/rabbitmq';
import { MangaRepository } from '@interfaceAdapters/gateways/mongoose';
import { ChapterRepository } from '@interfaceAdapters/gateways/mongoose/repositories/chapter.repository';
import {
  Chapter,
  ChapterSchema,
} from '@interfaceAdapters/gateways/mongoose/schemas';
import { ChapterMapper } from '@interfaceAdapters/presenters/mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MangaModule } from './manga.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),
    MangaModule,
  ],
  providers: [
    { provide: AbstractIdManagerUseCase, useClass: ChapterIdManagerUseCase },
    { provide: AbstractChapterRepository, useClass: ChapterRepository },
    ChapterMapper,
    ChapterManagerUseCase,
    ChapterFactoryUseCase,
  ],
  controllers: [ChapterControllerRabbitmq],
})
export class ChapterModule {}
