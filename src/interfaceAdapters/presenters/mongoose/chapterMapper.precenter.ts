import { Chapter } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { ChapterDocument } from '../../gateways/mongoose/schemas';

@Injectable()
export class ChapterMapper {
  /**
   * Maps a genre document to a genre entity
   */
  toEntity(genreDocument: ChapterDocument): Chapter {
    const { id, source, manga, order, pages, createdAt, updatedAt } =
      genreDocument;

    const newChapter = new Chapter(
      id,
      source,
      manga,
      order,
      pages,
      createdAt,
      updatedAt,
    );

    return newChapter;
  }
}
