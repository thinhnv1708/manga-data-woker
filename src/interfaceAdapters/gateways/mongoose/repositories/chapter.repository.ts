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

  async updateOrCreate(chapter: Chapter): Promise<Chapter> {
    const mangaId = chapter.getMangaId();
    const order = chapter.getOrder();
    const pages = chapter.getPages();

    const chapterDocument = await this.model.findOneAndUpdate(
      { mangaId, order },
      { mangaId, order, pages },
      {
        upsert: true,
        returnOriginal: false,
      },
    );

    return this.mapper.toEntity(chapterDocument);
  }
}
