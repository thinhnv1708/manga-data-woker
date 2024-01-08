import {
  AbstractChapterRepository,
  AbstractIdGeneratorUseCase,
} from '@core/abstracts';
import { ChapterFactoryUseCase, ChapterManagerUseCase } from '@core/useCases';
import { NanoIdGeneratorUseCase } from '@core/useCases/idGenerator';
import { ChapterControllerRabbitmq } from '@interfaceAdapters/controllers/rabbitmq';
import { ChapterRepository } from '@interfaceAdapters/gateways/mongoose/repositories/chapter.repository';
import {
  Chapter,
  ChapterSchema,
} from '@interfaceAdapters/gateways/mongoose/schemas';
import { ChapterMapper } from '@interfaceAdapters/presenters/mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),
  ],
  providers: [
    { provide: AbstractIdGeneratorUseCase, useClass: NanoIdGeneratorUseCase },
    { provide: AbstractChapterRepository, useClass: ChapterRepository },
    ChapterMapper,
    ChapterManagerUseCase,
    ChapterFactoryUseCase,
  ],
  controllers: [ChapterControllerRabbitmq],
})
export class ChapterModule {}
