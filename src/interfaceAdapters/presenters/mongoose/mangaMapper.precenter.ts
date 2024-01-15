import { Manga } from '@core/entities';
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
      path,
      title,
      subTitle,
      thumbnail,
      description,
      genrePaths,
      genres,
      totalChapter,
      status,
      compeletedMapDependencies,
      createdAt,
      updatedAt,
    } = mangaDocument;

    const newManga = new Manga(
      id,
      path,
      title,
      subTitle,
      thumbnail,
      description,
      genrePaths,
      genres,
      totalChapter,
      status,
      compeletedMapDependencies,
      createdAt,
      updatedAt,
    );

    return newManga;
  }
}
