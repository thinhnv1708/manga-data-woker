import { AbstractGenreRepository } from '@core/abtracts';
import { Module } from '@nestjs/common';
import { GenreManagerService } from './genreManager.service';
import { GenreFactoryService } from './genreFactory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, GenreSchema } from './database/mongoose/genre.mongooseSchema';
import { GenreMapper } from './database/mongoose/helpers';
import { GenreRepository } from './database/mongoose/genre.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
  ],
  providers: [
    { provide: AbstractGenreRepository, useClass: GenreRepository },
    GenreMapper,
    GenreManagerService,
    GenreFactoryService,
  ],
})
export class GenreModule {}
