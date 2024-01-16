import {
  AbstractAddJobAdapter,
  AbstractChapterRepository,
} from '@core/abstracts';
import {
  ISaveChapterInput,
  IUpdatePagesInChapterInput,
} from '@core/dtos/abstracts/chapter';
import { Chapter } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { ChapterFactoryUseCase } from './chapterFactory.useCase';

@Injectable()
export class ChapterManagerUseCase {
  constructor(
    private readonly chapterRepository: AbstractChapterRepository,
    private readonly chapterFactoryUseCase: ChapterFactoryUseCase,
    private readonly addJobAdapter: AbstractAddJobAdapter,
  ) {}

  async handleSaveChapter(
    saveChapterInput: ISaveChapterInput,
  ): Promise<Chapter> {
    const { path } = saveChapterInput;
    const chapter = await this.chapterRepository.findChapterByPath(path);

    if (chapter) {
      return this.updateChapter(chapter, saveChapterInput);
    }

    const newChapter =
      await this.chapterFactoryUseCase.createNewChapter(saveChapterInput);

    return this.chapterRepository.createChapter(newChapter);
  }

  async updateChapter(
    currentChapter: Chapter,
    saveChapterInput: ISaveChapterInput,
  ): Promise<Chapter> {
    const chapter = await this.chapterFactoryUseCase.updateChapter(
      currentChapter,
      saveChapterInput,
    );

    return this.chapterRepository.updateChapterById(chapter);
  }

  async updatePagesInChapter(
    updatePagesChapterInput: IUpdatePagesInChapterInput,
  ): Promise<Chapter> {
    const { path, pages } = updatePagesChapterInput;

    const chapter = await this.chapterRepository.findChapterByPath(path);

    if (!chapter) {
      return;
    }

    const chapterId = chapter.getId();
    const completedCrawler = pages?.length > 0;

    await this.chapterRepository.updatePagesInChapter(
      chapterId,
      pages,
      completedCrawler,
    );
  }
}
