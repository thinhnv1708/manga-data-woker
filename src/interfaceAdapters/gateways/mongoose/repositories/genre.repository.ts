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
    const source = genre.getSource();
    const title = genre.getTitle();
    const createdAt = genre.getCreatedAt();
    const updatedAt = genre.getUpdatedAt();

    const genreDocument = await this.model.create({
      id,
      source,
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

  async findGenreBySource(source: string): Promise<Genre> {
    const genreDocument = await this.model.findOne({ source }).lean();

    return this.mapper.toEntity(genreDocument);
  }

  async findGenresBySources(sources: string[]): Promise<Genre[]> {
    const genreDocuments = await this.model
      .find({ source: { $in: sources } })
      .lean();

    return genreDocuments.map((genreDocument) =>
      this.mapper.toEntity(genreDocument),
    );
  }
}
