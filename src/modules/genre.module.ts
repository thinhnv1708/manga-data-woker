import {
  AbstractGenreRepository,
  AbstractIdGeneratorUseCase,
} from '@core/abstracts';
import { GenreFactoryUseCase, GenreManagerUseCase } from '@core/useCases';
import { NanoIdGeneratorUseCase } from '@core/useCases/idGenerator';
import { GenreControllerRabbitmq } from '@interfaceAdapters/controllers/rabbitmq';
import { GenreRepository } from '@interfaceAdapters/gateways/mongoose/repositories/genre.repository';
import {
  Genre,
  GenreSchema,
} from '@interfaceAdapters/gateways/mongoose/schemas';
import { GenreMapper } from '@interfaceAdapters/presenters/mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
  providers: [
    { provide: AbstractIdGeneratorUseCase, useClass: NanoIdGeneratorUseCase },
    { provide: AbstractGenreRepository, useClass: GenreRepository },
    GenreMapper,
    GenreManagerUseCase,
    GenreFactoryUseCase,
  ],
  controllers: [GenreControllerRabbitmq],
})
export class GenreModule {}
