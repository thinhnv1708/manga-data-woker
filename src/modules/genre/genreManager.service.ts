import { AbstractGenreRepository } from '@core/abstracts';
import { CreateGenreDto } from '@core/dtos';
import { Genre } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { GenreFactoryService } from './genreFactory.service';

@Injectable()
export class GenreManagerService {
  constructor(
    private readonly genreRepository: AbstractGenreRepository,
    private readonly genreFactoryService: GenreFactoryService,
  ) {}

  async updateOrCreateGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    const newGenre = this.genreFactoryService.createNewGenre(createGenreDto);
    return this.genreRepository.updateOrCreate(newGenre);
  }
}
