import { Injectable } from '@nestjs/common';
import { ChapterFactoryUseCase } from './chapterFactory.useCase';
import { AbstractChapterRepository } from '@core/abstracts';
import { CreateChapterDto } from '@core/dtos';
import { Chapter } from '@core/entities';

@Injectable()
export class ChapterManagerUseCase {
  constructor(
    private readonly chapterRepository: AbstractChapterRepository,
    private readonly chapterFactoryUseCase: ChapterFactoryUseCase,
  ) {}

  async updateOrCreateChapter(
    createChapterDto: CreateChapterDto,
  ): Promise<Chapter> {
    const newChapter =
      this.chapterFactoryUseCase.createNewChapter(createChapterDto);
    return this.chapterRepository.updateOrCreate(newChapter);
  }
}
