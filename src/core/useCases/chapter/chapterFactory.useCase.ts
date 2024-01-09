import {
  AbstractIdManagerUseCase,
  AbstractMangaRepository,
} from '@core/abstracts';
import {
  ISaveChapterInput,
  IUpdateChapterInput,
} from '@core/dtos/abstracts/chapter';
import { Chapter, IChapterManga, Manga } from '@core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChapterFactoryUseCase {
  constructor(
    private readonly idManagerUseCase: AbstractIdManagerUseCase<number>,
    private readonly mangaRepository: AbstractMangaRepository,
  ) {}

  private mapChapterManga(manga: Manga): IChapterManga {
    return manga ? { id: manga.getId(), title: manga.getTitle() } : null;
  }

  async createNewChapter(
    saveChapterInput: ISaveChapterInput,
  ): Promise<Chapter> {
    const { mangaSource, source, order } = saveChapterInput;
    const pages = [];
    const createdAt = new Date();
    const updatedAt = new Date();

    const manga = await this.mangaRepository.findMangaBySource(mangaSource);

    const chapterManga = this.mapChapterManga(manga);

    const id = await this.idManagerUseCase.generateId();
    const newChapter = new Chapter(
      id,
      source,
      chapterManga,
      order,
      pages,
      createdAt,
      updatedAt,
    );

    return newChapter;
  }

  async updateChapter(
    currentChapter: Chapter,
    updateChapterInput: IUpdateChapterInput,
  ): Promise<Chapter> {
    const { pages } = updateChapterInput;

    const id = currentChapter.getId();
    const source = currentChapter.getSource();
    const manga = currentChapter.getManga();
    const order = currentChapter.getOrder();
    const createdAt = currentChapter.getCreatedAt();
    const upadtedAt = new Date();

    return new Chapter(id, source, manga, order, pages, createdAt, upadtedAt);
  }
}
