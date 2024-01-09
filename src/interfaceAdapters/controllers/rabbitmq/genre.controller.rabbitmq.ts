import { COMMONS, LOGGER } from '@constants/index';
import { AbstractLogger } from '@core/abstracts';
import { ISaveGenreInput } from '@core/dtos/abstracts/genre';
import { GenreManagerUseCase } from '@core/useCases';
import { saveGenreJoiSchema } from '@interfaceAdapters/presenters/joi';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { buildContextLog, buildLogMessage } from 'src/utils';
const { RABBITMQ_PATTERN } = COMMONS;
const { LOG_CONTEXT } = LOGGER;

@Controller()
export class GenreControllerRabbitmq {
  constructor(
    private readonly genreManagerUseCase: GenreManagerUseCase,
    private readonly logger: AbstractLogger,
  ) {}

  @MessagePattern(RABBITMQ_PATTERN.GENRE_HANDLE_DATA)
  async handleGenreData(data: ISaveGenreInput): Promise<void> {
    this.logger.log(
      buildLogMessage(
        `Pattern ${RABBITMQ_PATTERN.GENRE_HANDLE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog(LOG_CONTEXT.GENRE_CONTROLLER_RABBITMQ, 'handleGenreData'),
    );

    const { error, value } = saveGenreJoiSchema.validate(data);

    if (error) {
      this.logger.error(
        buildLogMessage(
          `Pattern ${RABBITMQ_PATTERN.GENRE_HANDLE_DATA}`,
          JSON.stringify(data),
          error.message,
        ),
        buildContextLog(
          LOG_CONTEXT.GENRE_CONTROLLER_RABBITMQ,
          'handleGenreData',
        ),
      );
      return;
    }

    await this.genreManagerUseCase.handleSaveGenre(<ISaveGenreInput>value);
  }
}
