import { AbstractMangaRepository } from '@core/abstracts';
import { CreateMangaDto } from '@core/dtos';
import { Manga } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { MangaFactoryUseCase } from './mangaFactory.useCase';

@Injectable()
export class MangaManagerUseCase {
  constructor(
    private readonly mangaRepository: AbstractMangaRepository,
    private readonly mangaFactoryUseCase: MangaFactoryUseCase,
  ) {}

  async updateOrCreateManga(createMangaDto: CreateMangaDto): Promise<Manga> {
    const newManga = this.mangaFactoryUseCase.createNewManga(createMangaDto);
    return this.mangaRepository.updateOrCreate(newManga);
  }
}
