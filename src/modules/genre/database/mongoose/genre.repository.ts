import { AbstractGenreRepository } from '@core/abtracts';
import { Genre } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenreDocument, Genre as MongooseGenre } from './genre.mongooseSchema';
import { GenreMapper } from './helpers';

@Injectable()
export class GenreRepository implements AbstractGenreRepository {
  constructor(
    @InjectModel(MongooseGenre.name)
    private readonly model: Model<GenreDocument>,
    private readonly mapper: GenreMapper,
  ) {}

  async updateOrCreate(genre: Genre): Promise<Genre> {
    const id = genre.getId();
    const title = genre.getTitle();

    const genreDocument = await this.model.findOneAndUpdate(
      { id },
      { id, title },
      {
        upsert: true,
        returnOriginal: false,
      },
    );

    return this.mapper.toEntity(genreDocument);
  }
}
