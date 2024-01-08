import { AbstractIdGeneratorUseCase } from '@core/abstracts';
import { CreateGenreDto } from '@core/dtos';
import { Genre } from '@core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenreFactoryUseCase {
  constructor(
    private readonly idGeneratorUseCase: AbstractIdGeneratorUseCase,
  ) {}

  createNewGenre(createGenreDto: CreateGenreDto): Genre {
    const title = createGenreDto.getTitle();
    const id = this.idGeneratorUseCase.generate();
    const createdAt = new Date();
    const updatedAt = new Date();

    const newGenre = new Genre(id, title, createdAt, updatedAt);

    return newGenre;
  }
}
