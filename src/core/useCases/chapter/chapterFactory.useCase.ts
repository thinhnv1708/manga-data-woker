import {
  AbstractIdManagerUseCase,
  AbstractMangaRepository,
} from '@core/abstracts';
import { ISaveChapterInput } from '@core/dtos/abstracts/chapter';
import { Chapter, IChapterManga, Manga } from '@core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChapterFactoryUseCase {
  constructor(
    private readonly idManagerUseCase: AbstractIdManagerUseCase,
    private readonly mangaRepository: AbstractMangaRepository,
  ) {}

  private mapChapterManga(manga: Manga): IChapterManga {
    return manga ? { id: manga.getId(), title: manga.getTitle() } : null;
  }

  private getCompeletedMapDependencies(chapterManga: IChapterManga): boolean {
    return !!chapterManga.title;
  }

  async createNewChapter(
    saveChapterInput: ISaveChapterInput,
  ): Promise<Chapter> {
    const { mangaPath, path, order, extraData } = saveChapterInput;
    const pages = [];
    const completedCrawler = false;
    const createdAt = new Date();
    const updatedAt = new Date();

    const manga = await this.mangaRepository.findMangaByPath(mangaPath);

    const chapterManga = this.mapChapterManga(manga);

    const id = await this.idManagerUseCase.generateId();

    const compeletedMapDependencies =
      this.getCompeletedMapDependencies(chapterManga);

    const newChapter = new Chapter(
      id,
      path,
      mangaPath,
      chapterManga,
      order,
      pages,
      extraData,
      completedCrawler,
      compeletedMapDependencies,
      createdAt,
      updatedAt,
    );

    return newChapter;
  }

  async updateChapter(
    currentChapter: Chapter,
    saveChapterInput: ISaveChapterInput,
  ): Promise<Chapter> {
    const { mangaPath, order, extraData } = saveChapterInput;

    const id = currentChapter.getId();
    const path = currentChapter.getPath();
    const pages = currentChapter.getPages();
    const completedCrawler = currentChapter.getCompeletedCrawler();
    const createdAt = currentChapter.getCreatedAt();
    const updatedAt = new Date();

    const manga = await this.mangaRepository.findMangaByPath(mangaPath);
    const chapterManga = this.mapChapterManga(manga);
    const compeletedMapDependencies =
      this.getCompeletedMapDependencies(chapterManga);

    return new Chapter(
      id,
      path,
      mangaPath,
      chapterManga,
      order,
      pages,
      extraData,
      completedCrawler,
      compeletedMapDependencies,
      createdAt,
      updatedAt,
    );
  }
}
