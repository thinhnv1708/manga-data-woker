import { AbstractIdGeneratorUseCase } from '@core/abstracts';
import { CreateChapterDto } from '@core/dtos';
import { Chapter, Page } from '@core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChapterFactoryUseCase {
  constructor(
    private readonly idGeneratorUseCase: AbstractIdGeneratorUseCase,
  ) {}

  createNewChapter(createChapterDto: CreateChapterDto): Chapter {
    const mangaId = this.idGeneratorUseCase.generate();
    const order = createChapterDto.getOrder();
    const pages = createChapterDto.getPages();
    const newPages = pages.map((page) => {
      const position = page.getPosition();
      const source = page.getSource();

      return new Page(position, source);
    });
    const createdAt = new Date();
    const updatedAt = new Date();

    const newChapter = new Chapter(
      mangaId,
      order,
      newPages,
      createdAt,
      updatedAt,
    );

    return newChapter;
  }
}
