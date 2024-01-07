import { Manga } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { MangaDocument } from '../manga.mongooseSchema';

@Injectable()
export class MangaMapper {
  /**
   * Maps a genre document to a genre entity
   */
  toEntity(mangaDocument: MangaDocument): Manga {
    const {
      id,
      title,
      subTitle,
      thumbnail,
      description,
      genreIds,
      totalChapter,
      status,
      createdAt,
      updatedAt,
    } = mangaDocument;
    const newManga = new Manga(
      id,
      title,
      subTitle,
      thumbnail,
      description,
      genreIds,
      totalChapter,
      status,
      createdAt,
      updatedAt,
    );

    return newManga;
  }
}
