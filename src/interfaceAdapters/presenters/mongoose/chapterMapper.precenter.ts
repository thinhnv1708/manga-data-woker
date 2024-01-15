import { Chapter } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { ChapterDocument } from '../../gateways/mongoose/schemas';

@Injectable()
export class ChapterMapper {
  /**
   * Maps a chapter document to a chapter entity
   */
  toEntity(chapterDocument: ChapterDocument): Chapter {
    if (!chapterDocument) {
      return null;
    }

    const {
      id,
      path,
      mangaPath,
      manga,
      order,
      pages,
      extraData,
      completedCrawler,
      compeletedMapDependencies,
      retryCount,
      createdAt,
      updatedAt,
    } = chapterDocument;

    const newChapter = new Chapter(
      id,
      path,
      mangaPath,
      manga,
      order,
      pages,
      extraData,
      completedCrawler,
      compeletedMapDependencies,
      retryCount,
      createdAt,
      updatedAt,
    );

    return newChapter;
  }
}
