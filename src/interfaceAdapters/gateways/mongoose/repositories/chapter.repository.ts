import { AbstractChapterRepository } from '@core/abstracts';
import { Chapter } from '@core/entities';
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
    const source = chapter.getSource();
    const manga = chapter.getManga();
    const order = chapter.getOrder();
    const pages = chapter.getPages();
    const createdAt = chapter.getCreatedAt();
    const updatedAt = chapter.getUpdatedAt();

    const chapterDocument = await this.model.create({
      id,
      source,
      manga,
      order,
      pages,
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
    const createdAt = chapter.getCreatedAt();
    const updatedAt = chapter.getUpdatedAt();

    const chapterDocument = await this.model
      .findOneAndUpdate(
        { id },
        {
          manga,
          order,
          pages,
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

  async findChapterBySource(source: string): Promise<Chapter> {
    const chapterDocument = await this.model.findOne({ source }).lean();

    return this.mapper.toEntity(chapterDocument);
  }
}
