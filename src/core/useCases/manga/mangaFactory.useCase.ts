import { AbstractIdGeneratorUseCase } from '@core/abstracts';
import { CreateMangaDto } from '@core/dtos';
import { Manga } from '@core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MangaFactoryUseCase {
  constructor(
    private readonly idGeneratorUseCase: AbstractIdGeneratorUseCase,
  ) {}

  createNewManga(createMangaDto: CreateMangaDto): Manga {
    const title = createMangaDto.getTitle();
    const subTitle = createMangaDto.getSubTitle();
    const thumbnail = createMangaDto.getThumbnail();
    const description = createMangaDto.getDescription();
    const genres = createMangaDto.getGenres();
    const totalChapter = 0;
    const status = createMangaDto.getStatus();
    const id = this.idGeneratorUseCase.generate();
    const genresIds = this.generateGenreIds(genres);
    const createdAt = new Date();
    const updatedAt = new Date();

    const newManga = new Manga(
      id,
      title,
      subTitle,
      thumbnail,
      description,
      genresIds,
      totalChapter,
      status,
      createdAt,
      updatedAt,
    );

    return newManga;
  }
  //TODO: move this to a genre factory

  private generateGenreIds(genres: string[]): string[] {
    const genreIds = genres.map((genre) => this.idGeneratorUseCase.generate());

    return genreIds;
  }
}
