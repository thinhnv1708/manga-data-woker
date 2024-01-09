import { IMangaGenre, Manga } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { MangaDocument } from '../../gateways/mongoose/schemas';

@Injectable()
export class MangaMapper {
  /**
   * Maps a genre document to a genre entity
   */
  toEntity(mangaDocument: MangaDocument): Manga {
    if (!mangaDocument) {
      return null;
    }

    const {
      id,
      source,
      title,
      subTitle,
      thumbnail,
      description,
      genres,
      totalChapter,
      status,
      createdAt,
      updatedAt,
    } = mangaDocument;

    const newManga = new Manga(
      id,
      source,
      title,
      subTitle,
      thumbnail,
      description,
      genres,
      totalChapter,
      status,
      createdAt,
      updatedAt,
    );

    return newManga;
  }
}
