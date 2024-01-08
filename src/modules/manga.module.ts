import {
  AbstractIdGeneratorUseCase,
  AbstractMangaRepository,
} from '@core/abstracts';
import { MangaFactoryUseCase, MangaManagerUseCase } from '@core/useCases';
import { NanoIdGeneratorUseCase } from '@core/useCases/idGenerator';
import { MangaControllerRabbitmq } from '@interfaceAdapters/controllers/rabbitmq';
import { MangaRepository } from '@interfaceAdapters/gateways/mongoose/repositories/manga.repository';
import {
  Manga,
  MangaSchema,
} from '@interfaceAdapters/gateways/mongoose/schemas';
import { MangaMapper } from '@interfaceAdapters/presenters/mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Manga.name, schema: MangaSchema }]),
  ],
  providers: [
    { provide: AbstractIdGeneratorUseCase, useClass: NanoIdGeneratorUseCase },
    { provide: AbstractMangaRepository, useClass: MangaRepository },
    MangaMapper,
    MangaManagerUseCase,
    MangaFactoryUseCase,
  ],
  controllers: [MangaControllerRabbitmq],
})
export class MangaModule {}
