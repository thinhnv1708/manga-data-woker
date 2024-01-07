import { AbstractIdGeneratorService } from '@core/abstracts';
import { CreateGenreDto } from '@core/dtos';
import { Genre } from '@core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenreFactoryService {
  constructor(
    private readonly idGeneratorService: AbstractIdGeneratorService,
  ) {}

  createNewGenre(createGenreDto: CreateGenreDto): Genre {
    const title = createGenreDto.getTitle();
    const id = this.idGeneratorService.generate(title);
    const createdAt = new Date();
    const updatedAt = new Date();

    const newGenre = new Genre(id, title, createdAt, updatedAt);

    return newGenre;
  }
}
