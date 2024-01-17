import { AbstractChapterRepository } from '@core/abstracts';
import { Chapter, IPage } from '@core/entities';
import { ChapterMapper } from '@interfaceAdapters/presenters/mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChapterDocument, Chapter as MongooseChapter } from '../schemas';
import { getPageLimit } from 'src/utils';

@Injectable()
export class ChapterRepository implements AbstractChapterRepository {
  constructor(
    @InjectModel(MongooseChapter.name)
    private readonly model: Model<ChapterDocument>,
    private readonly mapper: ChapterMapper,
  ) {}

  async createChapter(chapter: Chapter): Promise<Chapter> {
    const id = chapter.getId();
    const path = chapter.getPath();
    const mangaPath = chapter.getMangaPath();
    const manga = chapter.getManga();
    const order = chapter.getOrder();
    const pages = chapter.getPages();
    const extraData = chapter.getExtraData();
    const completedCrawler = chapter.getCompletedCrawler();
    const completedMapDependencies = chapter.getCompletedMapDependencies();
    const retryCount = chapter.getRetryCount();
    const createdAt = chapter.getCreatedAt();
    const updatedAt = chapter.getUpdatedAt();

    const chapterDocument = await this.model.create({
      id,
      path,
      mangaPath,
      manga,
      order,
      pages,
      extraData,
      completedCrawler,
      completedMapDependencies,
      retryCount,
      createdAt,
      updatedAt,
    });

    return this.mapper.toEntity(chapterDocument);
  }

  async updateChapterById(chapter: Chapter): Promise<Chapter> {
    const id = chapter.getId();
    const mangaPath = chapter.getMangaPath();
    const manga = chapter.getManga();
    const order = chapter.getOrder();
    // const pages = chapter.getPages();
    const extraData = chapter.getExtraData();
    const completedCrawler = chapter.getCompletedCrawler();
    const completedMapDependencies = chapter.getCompletedMapDependencies();
    const retryCount = chapter.getRetryCount();
    const createdAt = chapter.getCreatedAt();
    const updatedAt = chapter.getUpdatedAt();

    const chapterDocument = await this.model
      .findOneAndUpdate(
        { id },
        {
          mangaPath,
          manga,
          order,
          // pages,
          extraData,
          completedCrawler,
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

    return this.mapper.toEntity(chapterDocument);
  }

  async updatePagesInChapter(
    chapterId: number,
    pages: IPage[],
    completedCrawler: boolean,
  ): Promise<Chapter> {
    const chapterDocument = await this.model.findOneAndUpdate(
      { id: chapterId },
      { pages, completedCrawler },
      {
        new: true,
      },
    );

    return this.mapper.toEntity(chapterDocument);
  }

  async findChapterByPath(path: string): Promise<Chapter> {
    const chapterDocument = await this.model.findOne({ path }).lean();

    return this.mapper.toEntity(chapterDocument);
  }

  async findChaptersByRetryVersion(
    retryVersion: number,
    page: number,
    limit: number,
  ): Promise<Chapter[]> {
    const [newPage, newLimit] = getPageLimit(page, limit);
    const skip = (newPage - 1) * limit;

    const chapterDocuments = await this.model
      .find({
        retryVersion,
      })
      .skip(skip)
      .limit(newLimit)
      .lean();

    return chapterDocuments.map((chapterDocument) =>
      this.mapper.toEntity(chapterDocument),
    );
  }

  async findTotalAndMarkRetryVersion(): Promise<{
    total: number;
    retryVersion: number;
  }> {
    const markNumber = Date.now();

    const result = await this.model
      .updateMany(
        {
          completedMapDependencies: false,
        },
        { retryVersion: markNumber },
      )
      .lean();

    return {
      total: result.modifiedCount,
      retryVersion: markNumber,
    };
  }
}
