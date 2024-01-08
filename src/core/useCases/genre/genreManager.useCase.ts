import { AbstractGenreRepository } from '@core/abstracts';
import { CreateGenreDto } from '@core/dtos';
import { Genre } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { GenreFactoryUseCase } from './genreFactory.useCase';

@Injectable()
export class GenreManagerUseCase {
  constructor(
    private readonly genreRepository: AbstractGenreRepository,
    private readonly genreFactoryUseCase: GenreFactoryUseCase,
  ) {}

  async updateOrCreateGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    const newGenre = this.genreFactoryUseCase.createNewGenre(createGenreDto);
    return this.genreRepository.updateOrCreate(newGenre);
  }
}
