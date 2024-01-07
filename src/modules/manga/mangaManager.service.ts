import { AbstractMangaRepository } from '@core/abtracts';
import { CreateMangaDto } from '@core/dtos';
import { Manga } from '@core/entities';
import { Injectable } from '@nestjs/common';
import { MangaFactoryService } from './mangaFactory.service';

@Injectable()
export class MangaManagerService {
  constructor(
    private readonly mangaRepository: AbstractMangaRepository,
    private readonly mangaFactoryService: MangaFactoryService,
  ) {}

  async updateOrCreateManga(createMangaDto: CreateMangaDto): Promise<Manga> {
    const newManga = this.mangaFactoryService.createNewManga(createMangaDto);
    return this.mangaRepository.updateOrCreate(newManga);
  }
}
