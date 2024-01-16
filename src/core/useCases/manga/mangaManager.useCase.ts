import {
  AbstractAddJobAdapter,
  AbstractMangaRepository,
} from '@core/abstracts';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import { Manga } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { MangaFactoryUseCase } from './mangaFactory.useCase';

@Injectable()
export class MangaManagerUseCase {
  constructor(
    private readonly mangaRepository: AbstractMangaRepository,
    private readonly mangaFactoryUseCase: MangaFactoryUseCase,
    private readonly addJobAdapter: AbstractAddJobAdapter,
  ) {}

  async createManga(saveMangaInput: ISaveMangaInput): Promise<Manga> {
    const newManga =
      await this.mangaFactoryUseCase.createNewManga(saveMangaInput);

    return this.mangaRepository.createManga(newManga);
  }

  async updateManga(
    currentManga: Manga,
    saveMangaInput: ISaveMangaInput,
  ): Promise<Manga> {
    const manga = await this.mangaFactoryUseCase.updateManga(
      currentManga,
      saveMangaInput,
    );

    return this.mangaRepository.updateManga(manga);
  }

  async handleSaveManga(saveMangaInput: ISaveMangaInput): Promise<Manga> {
    const { path } = saveMangaInput;

    const manga = await this.mangaRepository.findMangaByPath(path);

    if (!manga) {
      return this.createManga(saveMangaInput);
    }

    return this.updateManga(manga, saveMangaInput);
  }

  async afterHandleSaveManga(
    saveMangaInput: ISaveMangaInput,
    retrySaveDataMaxAttempts: number,
  ): Promise<Manga> {
    const manga = await this.handleSaveManga(saveMangaInput);

    const completedMapDependencies = manga.getCompletedMapDependencies();
    const retryCount = manga.getRetryCount();
    const { genrePaths } = saveMangaInput;

    if (
      genrePaths?.length > 0 &&
      !completedMapDependencies &&
      retryCount <= retrySaveDataMaxAttempts
    ) {
      manga.setRetryCount(retryCount + 1);

      await this.mangaRepository.updateManga(manga);

      await this.addJobAdapter.retrySaveMangaJob(saveMangaInput);
    }

    return manga;
  }
}
