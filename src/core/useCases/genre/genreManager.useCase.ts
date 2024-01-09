import { AbstractGenreRepository } from '@core/abstracts';
import { ISaveGenreInput } from '@core/dtos/abstracts/genre';
import { Genre } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { GenreFactoryUseCase } from './genreFactory.useCase';

@Injectable()
export class GenreManagerUseCase {
  constructor(
    private readonly genreRepository: AbstractGenreRepository,
    private readonly genreFactoryUseCase: GenreFactoryUseCase,
  ) {}

  async createGenre(saveGenreInput: ISaveGenreInput): Promise<Genre> {
    const newGenre =
      await this.genreFactoryUseCase.createNewGenre(saveGenreInput);
    return this.genreRepository.createGenre(newGenre);
  }

  async updateGenre(
    currentGenre: Genre,
    saveGenreInput: ISaveGenreInput,
  ): Promise<Genre> {
    const genre = this.genreFactoryUseCase.updateGenre(
      currentGenre,
      saveGenreInput,
    );
    return this.genreRepository.updateGenreById(genre);
  }

  async handleSaveGenre(saveGenreInput: ISaveGenreInput): Promise<Genre> {
    const { source } = saveGenreInput;

    const genre = await this.genreRepository.findGenreBySource(source);

    if (!genre) {
      return this.createGenre(saveGenreInput);
    }

    return this.updateGenre(genre, saveGenreInput);
  }
}
