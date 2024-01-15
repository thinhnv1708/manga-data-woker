import { AbstractChapterRepository } from '@core/abstracts';
import { Chapter, IPage } from '@core/entities';
import { ChapterMapper } from '@interfaceAdapters/presenters/mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChapterDocument, Chapter as MongooseChapter } from '../schemas';

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
    const manga = chapter.getManga();
    const order = chapter.getOrder();
    const pages = chapter.getPages();
    const extraData = chapter.getExtraData();
    const completedCrawler = chapter.getCompeletedCrawler();
    const compeletedMapDependencies = chapter.getCompeletedMapDependencies();
    const retryCount = chapter.getRetryCount();
    const createdAt = chapter.getCreatedAt();
    const updatedAt = chapter.getUpdatedAt();

    const chapterDocument = await this.model.create({
      id,
      path,
      manga,
      order,
      pages,
      extraData,
      completedCrawler,
      compeletedMapDependencies,
      retryCount,
      createdAt,
      updatedAt,
    });

    return this.mapper.toEntity(chapterDocument);
  }

  async updateChapterById(chapter: Chapter): Promise<Chapter> {
    const id = chapter.getId();
    const manga = chapter.getManga();
    const order = chapter.getOrder();
    const pages = chapter.getPages();
    const extraData = chapter.getExtraData();
    const completedCrawler = chapter.getCompeletedCrawler();
    const compeletedMapDependencies = chapter.getCompeletedMapDependencies();
    const retryCount = chapter.getRetryCount();
    const createdAt = chapter.getCreatedAt();
    const updatedAt = chapter.getUpdatedAt();

    const chapterDocument = await this.model
      .findOneAndUpdate(
        { id },
        {
          manga,
          order,
          pages,
          extraData,
          completedCrawler,
          compeletedMapDependencies,
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

  async findCompletedCrawlerChapters(
    NumberOfLastChapters: number = 0,
  ): Promise<Chapter[]> {
    return;
    // const chapterDocuments = await this.model
    //   .find()
    //   .sort({ order: -1 })
    //   .limit(NumberOfLastChapters);
  }
}
