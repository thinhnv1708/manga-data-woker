import { COMMONS } from '@constants/index';
import { AbstractLoggerService } from '@core/abtracts';
import { CreateMangaDto } from '@core/dtos';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { buildContextLog, buildLogMessage } from 'src/utils';
import { MangaManagerService } from './mangaManager.service';
import { createMangaJoiSchema } from './joiSchemas';
const { RABBITMQ_PATTERNT } = COMMONS;

@Controller()
export class MangaRabbitmqController {
  constructor(
    private readonly mangaManagerService: MangaManagerService,
    private readonly loggerService: AbstractLoggerService,
  ) {}

  @MessagePattern(RABBITMQ_PATTERNT.MANGA_HANDLE_DATA)
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
        `Pattern ${RABBITMQ_PATTERNT.MANGA_HANDLE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog('MangaRabbitmqController', 'handleMangaData'),
    );

    const { error, value } = createMangaJoiSchema.validate(data);

    if (error) {
      this.loggerService.error(
        buildLogMessage(
          `Pattern ${RABBITMQ_PATTERNT.GENRE_HANDLE_DATA}`,
          JSON.stringify(error),
        ),
        buildContextLog('MangaRabbitmqController', 'handleMangaData'),
      );
      return;
    }

    const { title, subTitle, thumbnail, description, genres, status } = value;

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
