import {
  AbstractGenreRepository,
  AbstractIdManagerUseCase,
} from '@core/abstracts';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import { Genre, IMangaGenre, Manga } from '@core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MangaFactoryUseCase {
  constructor(
    private readonly idManagerUseCase: AbstractIdManagerUseCase,
    private readonly genreRepository: AbstractGenreRepository,
  ) {}

  private mapGenreEntityToMangaGenre(genres: Genre[]): IMangaGenre[] {
    return genres
      .map((genre) => {
        const { id, title } = genre;
        return { id, title };
      })
      .filter((genre) => genre.title);
  }

  private getCompeletedMapDependencies(
    genrePaths: string[],
    genresMapped: IMangaGenre[],
  ): boolean {
    return genrePaths.length === genresMapped.length;
  }

  async createNewManga(saveMangaInput: ISaveMangaInput): Promise<Manga> {
    const {
      path,
      title,
      subTitle,
      thumbnail,
      description,
      totalChapter,
      genrePaths,
      status,
    } = saveMangaInput;
    const createdAt = new Date();
    const updatedAt = new Date();

    const genres = await this.genreRepository.findGenresByPaths(genrePaths);

    const mangaGenres = this.mapGenreEntityToMangaGenre(genres);

    const compeletedMapDependencies = this.getCompeletedMapDependencies(
      genrePaths,
      mangaGenres,
    );
    const id = await this.idManagerUseCase.generateId();

    return new Manga(
      id,
      path,
      title,
      subTitle,
      thumbnail,
      description,
      genrePaths,
      mangaGenres,
      totalChapter,
      status,
      compeletedMapDependencies,
      createdAt,
      updatedAt,
    );
  }

  async updateManga(
    currentManga: Manga,
    saveMangaInput: ISaveMangaInput,
  ): Promise<Manga> {
    const {
      title,
      subTitle,
      thumbnail,
      description,
      totalChapter,
      genrePaths,
      status,
    } = saveMangaInput;

    const genres = await this.genreRepository.findGenresByPaths(genrePaths);

    const id = currentManga.getId();
    const path = currentManga.getPath();
    const createdAt = currentManga.getCreatedAt();
    const updatedAt = new Date();
    const mangaGenres = this.mapGenreEntityToMangaGenre(genres);

    const compeletedMapDependencies = this.getCompeletedMapDependencies(
      genrePaths,
      mangaGenres,
    );

    return new Manga(
      id,
      path,
      title,
      subTitle,
      thumbnail,
      description,
      genrePaths,
      mangaGenres,
      totalChapter,
      status,
      compeletedMapDependencies,
      createdAt,
      updatedAt,
    );
  }
}
