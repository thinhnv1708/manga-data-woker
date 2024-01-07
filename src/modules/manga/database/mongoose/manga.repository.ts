import { AbstractMangaRepository } from '@core/abstract';
import { Manga } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MangaDocument, Manga as MongooseManga } from './manga.mongooseSchema';
import { MangaMapper } from './helpers';

@Injectable()
export class MangaRepository implements AbstractMangaRepository {
  constructor(
    @InjectModel(MongooseManga.name)
    private readonly model: Model<MangaDocument>,
    private readonly mapper: MangaMapper,
  ) {}

  async updateOrCreate(manga: Manga): Promise<Manga> {
    const id = manga.getId();
    const title = manga.getTitle();
    const subTitle = manga.getSubTitle();
    const thumbnail = manga.getThumbnail();
    const description = manga.getDescription();
    const genreIds = manga.getGenreIds();
    const status = manga.getStatus();

    const mangaDocument = await this.model.findOneAndUpdate(
      { id },
      { id, title, subTitle, thumbnail, description, genreIds, status },
      {
        upsert: true,
        returnOriginal: false,
      },
    );

    return this.mapper.toEntity(mangaDocument);
  }
}
