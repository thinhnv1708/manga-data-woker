import { COMMONS } from '@constants/index';
import { AbstractLogger } from '@core/abstracts';
import { CreateMangaDto } from '@core/dtos';
import { MangaManagerUseCase } from '@core/useCases';
import { createMangaJoiSchema } from '@interfaceAdapters/presenters/joi';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { buildContextLog, buildLogMessage } from 'src/utils';
const { RABBITMQ_PATTERN } = COMMONS;

@Controller()
export class MangaControllerRabbitmq {
  constructor(
    private readonly mangaManagerUseCase: MangaManagerUseCase,
    private readonly logger: AbstractLogger,
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
    this.logger.log(
      buildLogMessage(
        `Pattern ${RABBITMQ_PATTERN.MANGA_HANDLE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog('MangaRabbitmqController', 'handleMangaData'),
    );

    const { error, value } = createMangaJoiSchema.validate(data);

    if (error) {
      this.logger.error(
        buildLogMessage(
          `Pattern ${RABBITMQ_PATTERN.GENRE_HANDLE_DATA}`,
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

    await this.mangaManagerUseCase.updateOrCreateManga(createMangaDto);
  }
}
