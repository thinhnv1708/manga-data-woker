import { AbstractIdManagerUseCase } from '@core/abstracts';
import { ISaveGenreInput } from '@core/dtos/abstracts/genre';
import { Genre } from '@core/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GenreFactoryUseCase {
  constructor(private readonly idManagerUseCase: AbstractIdManagerUseCase) {}

  async createNewGenre(saveGenreInput: ISaveGenreInput): Promise<Genre> {
    const { path, title } = saveGenreInput;
    const id = await this.idManagerUseCase.generateId();
    const createdAt = new Date();
    const updatedAt = new Date();

    return new Genre(id, path, title, createdAt, updatedAt);
  }

  updateGenre(currentGenre: Genre, saveGenreInput: ISaveGenreInput): Genre {
    const { title } = saveGenreInput;

    const id = currentGenre.getId();
    const path = currentGenre.getPath();
    const createdAt = currentGenre.getCreatedAt();
    const updatedAt = new Date();

    return new Genre(id, path, title, createdAt, updatedAt);
  }
}
