import { Injectable } from '@nestjs/common';
import { ChapterFactoryService } from './chapterFactory.service';
import { AbstractChapterRepository } from '@core/abstracts';
import { CreateChapterDto } from '@core/dtos';
import { Chapter } from '@core/entities';

@Injectable()
export class ChapterManagerService {
  constructor(
    private readonly chapterRepository: AbstractChapterRepository,
    private readonly chapterFactoryService: ChapterFactoryService,
  ) {}

  async updateOrCreateChapter(
    createChapterDto: CreateChapterDto,
  ): Promise<Chapter> {
    const newChapter =
      this.chapterFactoryService.createNewChapter(createChapterDto);
    return this.chapterRepository.updateOrCreate(newChapter);
  }
}
