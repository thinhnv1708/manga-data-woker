import { AbstractIdGeneratorService } from '@core/abstract';
import { CreateChapterDto } from '@core/dtos';
import { Chapter, Page } from '@core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChapterFactoryService {
  constructor(
    private readonly idGeneratorService: AbstractIdGeneratorService,
  ) {}

  createNewChapter(createChapterDto: CreateChapterDto): Chapter {
    const mangaTitle = createChapterDto.getMangaTitle();
    const mangaId = this.idGeneratorService.generate(mangaTitle);
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
