import { Chapter, Page } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { ChapterDocument } from '../../gateways/mongoose/schemas';

@Injectable()
export class ChapterMapper {
  /**
   * Maps a genre document to a genre entity
   */
  toEntity(genreDocument: ChapterDocument): Chapter {
    const { mangaId, order, pages, createdAt, updatedAt } = genreDocument;

    const newPages = pages.map((page) => {
      const { position, source } = page;

      return new Page(position, source);
    });

    const newChapter = new Chapter(
      mangaId,
      order,
      newPages,
      createdAt,
      updatedAt,
    );

    return newChapter;
  }
}
