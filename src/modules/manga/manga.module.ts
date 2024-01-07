import { IdGeneratorService } from '@commonUsecases/index';
import {
  AbstractIdGeneratorService,
  AbstractMangaRepository,
} from '@core/abstract';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Manga,
  MangaMapper,
  MangaRepository,
  MangaSchema,
} from './database/mongoose';
import { MangaFactoryService } from './mangaFactory.service';
import { MangaManagerService } from './mangaManager.service';
import { MangaRabbitmqController } from './manga.rabbitmq.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Manga.name, schema: MangaSchema }]),
  ],
  providers: [
    { provide: AbstractIdGeneratorService, useClass: IdGeneratorService },
    { provide: AbstractMangaRepository, useClass: MangaRepository },
    MangaMapper,
    MangaManagerService,
    MangaFactoryService,
  ],
  controllers: [MangaRabbitmqController],
})
export class MangaModule {}
