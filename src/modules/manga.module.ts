import {
  AbstractIdManagerUseCase,
  AbstractMangaRepository,
} from '@core/abstracts';
import {
  MangaFactoryUseCase,
  MangaIdManagerUseCase,
  MangaManagerUseCase,
} from '@core/useCases';
import { MangaControllerRabbitmq } from '@interfaceAdapters/controllers/rabbitmq';
import { MangaRepository } from '@interfaceAdapters/gateways/mongoose/repositories/manga.repository';
import {
  Manga,
  MangaSchema,
} from '@interfaceAdapters/gateways/mongoose/schemas';
import { MangaMapper } from '@interfaceAdapters/presenters/mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreModule } from './genre.module';
import { IdGeneratorModule } from './idGenerator.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Manga.name, schema: MangaSchema }]),
    IdGeneratorModule,
    GenreModule,
  ],
  providers: [
    { provide: AbstractIdManagerUseCase, useClass: MangaIdManagerUseCase },
    { provide: AbstractMangaRepository, useClass: MangaRepository },
    MangaMapper,
    MangaManagerUseCase,
    MangaFactoryUseCase,
  ],
  controllers: [MangaControllerRabbitmq],
  exports: [AbstractMangaRepository],
})
export class MangaModule {}
