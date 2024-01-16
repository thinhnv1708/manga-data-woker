import { COMMONS, LOGGER } from '@constants/index';
import { AbstractLogger } from '@core/abstracts';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import { MangaManagerUseCase } from '@core/useCases';
import { saveMangaJoiSchema } from '@interfaceAdapters/presenters/joi';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { buildContextLog, buildLogMessage } from 'src/utils';
const { RABBITMQ_PATTERN } = COMMONS;
const { LOG_CONTEXT } = LOGGER;

@Controller()
export class MangaControllerRabbitmq {
  constructor(
    private readonly mangaManagerUseCase: MangaManagerUseCase,
    private readonly logger: AbstractLogger,
  ) {}

  @MessagePattern(RABBITMQ_PATTERN.MANGA_HANDLE_SAVE_DATA)
  async handleMangaData(data: ISaveMangaInput): Promise<void> {
    this.logger.log(
      buildLogMessage(
        `Pattern ${RABBITMQ_PATTERN.MANGA_HANDLE_SAVE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog(LOG_CONTEXT.MANGA_CONTROLLER_RABBITMQ, 'handleMangaData'),
    );

    const { error, value } = saveMangaJoiSchema.validate(data);

    if (error) {
      this.logger.error(
        buildLogMessage(
          `Pattern ${RABBITMQ_PATTERN.GENRE_HANDLE_SAVE_DATA}`,
          JSON.stringify(data),
          error.message,
        ),
        buildContextLog(
          LOG_CONTEXT.MANGA_CONTROLLER_RABBITMQ,
          'handleMangaData',
        ),
      );
      return;
    }

    await this.mangaManagerUseCase.handleSaveManga(<ISaveMangaInput>value);
  }
}
