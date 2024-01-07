import { COMMONS } from '@constants/index';
import { AbstractLoggerService } from '@core/abstract';
import { CreateMangaDto } from '@core/dtos';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { buildContextLog, buildLogMessage } from 'src/utils';
import { MangaManagerService } from './mangaManager.service';
const { RABBITMQ_PATTERN } = COMMONS;

@Controller()
export class MangaRabbitmqController {
  constructor(
    private readonly mangaManagerService: MangaManagerService,
    private readonly loggerService: AbstractLoggerService,
  ) {}

  @MessagePattern(RABBITMQ_PATTERN.MANGA_HANDLE_DATA)
  async handleMangaData(data: {
    title: string;
    subTitle: string;
    thumbnail: string;
    description: string;
    genres: string[];
    status: string;
  }): Promise<void> {
    this.loggerService.log(
      buildLogMessage(
        `Pattern ${RABBITMQ_PATTERN.MANGA_HANDLE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog('MangaRabbitmqController', 'handleMangaData'),
    );

    const { title, subTitle, thumbnail, description, genres, status } = data;

    const createMangaDto = new CreateMangaDto(
      title,
      subTitle,
      thumbnail,
      description,
      genres,
      status,
    );

    await this.mangaManagerService.updateOrCreateManga(createMangaDto);
  }
}
