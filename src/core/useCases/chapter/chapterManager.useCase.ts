import { AbstractChapterRepository } from '@core/abstracts';
import {
  ISaveChapterInput,
  IUpdateChapterInput,
} from '@core/dtos/abstracts/chapter';
import { Chapter } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { ChapterFactoryUseCase } from './chapterFactory.useCase';

@Injectable()
export class ChapterManagerUseCase {
  constructor(
    private readonly chapterRepository: AbstractChapterRepository,
    private readonly chapterFactoryUseCase: ChapterFactoryUseCase,
  ) {}

  async handleSaveChapter(
    saveChapterInput: ISaveChapterInput,
  ): Promise<Chapter> {
    const { source } = saveChapterInput;
    const chapter = await this.chapterRepository.findChapterBySource(source);

    if (chapter) {
      return;
    }

    const newChapter =
      await this.chapterFactoryUseCase.createNewChapter(saveChapterInput);

    return this.chapterRepository.createChapter(newChapter);
  }

  async updateChapter(
    updateChapterInput: IUpdateChapterInput,
  ): Promise<Chapter> {
    const { source } = updateChapterInput;

    const chapter = await this.chapterRepository.findChapterBySource(source);

    if (!chapter) {
      return;
    }

    const newChapter = await this.chapterFactoryUseCase.updateChapter(
      chapter,
      updateChapterInput,
    );

    return this.chapterRepository.updateChapterById(newChapter);
  }
}
