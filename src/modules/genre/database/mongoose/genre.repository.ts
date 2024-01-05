import { AbstractGenreRepository } from '@core/abtracts';
import { Injectable } from '@nestjs/common';
import { GenreDocument, Genre as MongooseGenre } from './genre.mongooseSchema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from '@core/entities';
import { GenreMapper } from './helpers';

@Injectable()
export class GenreRepository implements AbstractGenreRepository {
  constructor(
    @InjectModel(MongooseGenre.name)
    private readonly model: Model<GenreDocument>,
    private readonly mapper: GenreMapper,
  ) {}
  async findOneById(id: string): Promise<Genre> {
    const genreDocument = await this.model.findOne({ id }).lean();

    if (!genreDocument) {
      return null;
    }

    return this.mapper.toEntity(genreDocument);
  }

  async create(genre: Genre): Promise<Genre> {
    const id = genre.getId();
    const title = genre.getTitle();
    const slug = genre.getSlug();
    const createdAt = genre.getCreatedAt();
    const updatedAt = genre.getUpdatedAt();

    const newGenre = new this.model({
      id,
      title,
      slug,
      createdAt,
      updatedAt,
    });

    await newGenre.save();

    return this.mapper.toEntity(newGenre);
  }
}
