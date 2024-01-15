import { AbstractGenreRepository } from '@core/abstracts';
import { Genre } from '@core/entities';
import { GenreMapper } from '@interfaceAdapters/presenters/mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenreDocument, Genre as MongooseGenre } from '../schemas';

@Injectable()
export class GenreRepository implements AbstractGenreRepository {
  constructor(
    @InjectModel(MongooseGenre.name)
    private readonly model: Model<GenreDocument>,
    private readonly mapper: GenreMapper,
  ) {}

  async createGenre(genre: Genre): Promise<Genre> {
    const id = genre.getId();
    const path = genre.getPath();
    const title = genre.getTitle();
    const createdAt = genre.getCreatedAt();
    const updatedAt = genre.getUpdatedAt();

    const genreDocument = await this.model.create({
      id,
      path,
      title,
      createdAt,
      updatedAt,
    });

    return this.mapper.toEntity(genreDocument);
  }

  async updateGenreById(genre: Genre): Promise<Genre> {
    const id = genre.getId();
    const title = genre.getTitle();
    const createdAt = genre.getCreatedAt();
    const updatedAt = genre.getUpdatedAt();

    const genreDocument = await this.model
      .findOneAndUpdate({ id }, { title, createdAt, updatedAt }, { new: true })
      .lean();

    return this.mapper.toEntity(genreDocument);
  }

  async findGenreByPath(path: string): Promise<Genre> {
    if (!path) {
      return null;
    }

    const genreDocument = await this.model.findOne({ path }).lean();

    return this.mapper.toEntity(genreDocument);
  }

  async findGenresByPaths(paths: string[]): Promise<Genre[]> {
    if (!paths || paths.length === 0) {
      return [];
    }

    const genreDocuments = await this.model
      .find({ path: { $in: paths } })
      .lean();

    return genreDocuments.map((genreDocument) =>
      this.mapper.toEntity(genreDocument),
    );
  }
}
