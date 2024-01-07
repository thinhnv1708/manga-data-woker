import { IdGeneratorService } from '@commonUsecases/index';
import {
  AbstractGenreRepository,
  AbstractIdGeneratorService,
} from '@core/abtracts';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Genre,
  GenreMapper,
  GenreRepository,
  GenreSchema,
} from './database/mongoose';
import { GenreRabbitmqController } from './genre.rabbitmq.controller';
import { GenreFactoryService } from './genreFactory.service';
import { GenreManagerService } from './genreManager.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
  providers: [
    { provide: AbstractIdGeneratorService, useClass: IdGeneratorService },
    { provide: AbstractGenreRepository, useClass: GenreRepository },
    GenreMapper,
    GenreManagerService,
    GenreFactoryService,
  ],
  controllers: [GenreRabbitmqController],
})
export class GenreModule {}
