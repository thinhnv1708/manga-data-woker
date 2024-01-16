import { AbstractMangaRepository } from '@core/abstracts';
import { Manga } from '@core/entities';
import { MangaMapper } from '@interfaceAdapters/presenters/mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MangaDocument, Manga as MongooseManga } from '../schemas';
import { getPageLimit } from 'src/utils';

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
    const completedMapDependencies = manga.getCompletedMapDependencies();
    const retryCount = manga.getRetryCount();
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
      completedMapDependencies,
      retryCount,
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
    const completedMapDependencies = manga.getCompletedMapDependencies();
    const retryCount = manga.getRetryCount();
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
          completedMapDependencies,
          retryCount,
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
    if (!path) {
      return null;
    }

    const mangaDocument = await this.model.findOne({ path }).lean();

    return this.mapper.toEntity(mangaDocument);
  }

  async findMangaPathsMissingTitle(
    page: number,
    limit: number,
  ): Promise<string[]> {
    const [newPage, newLimit] = getPageLimit(page, limit);
    const skip = (newPage - 1) * limit;

    const mangaDocuments = await this.model
      .find({
        $or: [{ title: { $exists: false } }, { title: { $in: [null, ''] } }],
      })
      .skip(skip)
      .limit(newLimit)
      .select({ path: 1 })
      .lean();

    return mangaDocuments.map((mangaDocument) => mangaDocument.path);
  }

  async findTotalMangaPathsMissingTitle(): Promise<number> {
    const totalDocuments = await this.model
      .countDocuments({
        $or: [{ title: { $exists: false } }, { title: { $in: [null, ''] } }],
      })
      .lean();

    return totalDocuments;
  }
}
