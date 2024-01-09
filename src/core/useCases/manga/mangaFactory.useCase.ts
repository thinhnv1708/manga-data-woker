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
    return genres.map((genre) => {
      const { id, title } = genre;
      return { id, title };
    });
  }

  async createNewManga(saveMangaInput: ISaveMangaInput): Promise<Manga> {
    const {
      source,
      title,
      subTitle,
      thumbnail,
      description,
      totalChapter,
      genreSources,
      status,
    } = saveMangaInput;
    const createdAt = new Date();
    const updatedAt = new Date();

    const genres = await this.genreRepository.findGenresBySources(genreSources);

    const mangaGenres = this.mapGenreEntityToMangaGenre(genres);

    const id = await this.idManagerUseCase.generateId();

    return new Manga(
      id,
      source,
      title,
      subTitle,
      thumbnail,
      description,
      mangaGenres,
      totalChapter,
      status,
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
      genreSources,
      status,
    } = saveMangaInput;

    const genres = await this.genreRepository.findGenresBySources(genreSources);

    const id = currentManga.getId();
    const source = currentManga.getSource();
    const createdAt = currentManga.getCreatedAt();
    const updatedAt = new Date();
    const mangaGenres = this.mapGenreEntityToMangaGenre(genres);

    return new Manga(
      id,
      source,
      title,
      subTitle,
      thumbnail,
      description,
      mangaGenres,
      totalChapter,
      status,
      createdAt,
      updatedAt,
    );
  }
}
