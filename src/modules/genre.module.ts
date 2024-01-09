import {
  AbstractGenreRepository,
  AbstractIdManagerUseCase,
} from '@core/abstracts';
import {
  GenreFactoryUseCase,
  GenreIdManagerUseCase,
  GenreManagerUseCase,
} from '@core/useCases';
import { GenreControllerRabbitmq } from '@interfaceAdapters/controllers/rabbitmq';
import { GenreRepository } from '@interfaceAdapters/gateways/mongoose/repositories/genre.repository';
import {
  Genre,
  GenreSchema,
} from '@interfaceAdapters/gateways/mongoose/schemas';
import { GenreMapper } from '@interfaceAdapters/presenters/mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IdGeneratorModule } from './idGenerator.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
    IdGeneratorModule,
  ],
  providers: [
    { provide: AbstractIdManagerUseCase, useClass: GenreIdManagerUseCase },
    { provide: AbstractGenreRepository, useClass: GenreRepository },
    GenreMapper,
    GenreManagerUseCase,
    GenreFactoryUseCase,
  ],
  controllers: [GenreControllerRabbitmq],
  exports: [AbstractGenreRepository],
})
export class GenreModule {}
