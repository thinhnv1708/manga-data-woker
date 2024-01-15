import { AbstractMangaRepository } from '@core/abstracts';
import { Manga } from '@core/entities';
import { MangaMapper } from '@interfaceAdapters/presenters/mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MangaDocument, Manga as MongooseManga } from '../schemas';

@Injectable()
export class MangaRepository implements AbstractMangaRepository {
  constructor(
    @InjectModel(MongooseManga.name)
    private readonly model: Model<MangaDocument>,
    private readonly mapper: MangaMapper,
  ) {}

  async createManga(manga: Manga): Promise<Manga> {
    const id = manga.getId();
    const path = manga.getPath();
    const title = manga.getTitle();
    const subTitle = manga.getSubTitle();
    const thumbnail = manga.getThumbnail();
    const description = manga.getDescription();
    const genres = manga.getGenres();
    const totalChapter = manga.getTotalChapter();
    const status = manga.getStatus();
    const createdAt = manga.getCreatedAt();
    const updatedAt = manga.getUpdatedAt();

    const mangaDocument = await this.model.create({
      id,
      path,
      title,
      subTitle,
      thumbnail,
      description,
      genres,
      totalChapter,
      status,
      createdAt,
      updatedAt,
    });

    return this.mapper.toEntity(mangaDocument);
  }

  async updateManga(manga: Manga): Promise<Manga> {
    const id = manga.getId();
    const title = manga.getTitle();
    const subTitle = manga.getSubTitle();
    const thumbnail = manga.getThumbnail();
    const description = manga.getDescription();
    const genres = manga.getGenres();
    const totalChapter = manga.getTotalChapter();
    const status = manga.getStatus();
    const createdAt = manga.getCreatedAt();
    const updatedAt = manga.getUpdatedAt();

    const mangaDocument = await this.model
      .findOneAndUpdate(
        { id },
        {
          title,
          subTitle,
          thumbnail,
          description,
          genres,
          totalChapter,
          status,
          createdAt,
          updatedAt,
        },
        {
          new: true,
        },
      )
      .lean();

    return this.mapper.toEntity(mangaDocument);
  }

  async findMangaByPath(path: string): Promise<Manga> {
    const mangaDocument = await this.model.findOne({ path }).lean();

    return this.mapper.toEntity(mangaDocument);
  }
}
