import { COMMONS } from '@constants/index';
import { AbstractLogger } from '@core/abstracts';
import { CreateGenreDto } from '@core/dtos';
import { GenreManagerUseCase } from '@core/useCases';
import { createGenreJoiSchema } from '@interfaceAdapters/presenters/joi';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { buildContextLog, buildLogMessage } from 'src/utils';
const { RABBITMQ_PATTERN } = COMMONS;

@Controller()
export class GenreControllerRabbitmq {
  constructor(
    private readonly genreManagerUseCase: GenreManagerUseCase,
    private readonly logger: AbstractLogger,
  ) {}

  @MessagePattern(RABBITMQ_PATTERN.GENRE_HANDLE_DATA)
  async handleGenreData(data: { title: string }): Promise<void> {
    this.logger.log(
      buildLogMessage(
        `Pattern ${RABBITMQ_PATTERN.GENRE_HANDLE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog('GenreRabbitmqController', 'handleGenreData'),
    );

    const { error, value } = createGenreJoiSchema.validate(data);

    if (error) {
      this.logger.error(
        buildLogMessage(
          `Pattern ${RABBITMQ_PATTERN.GENRE_HANDLE_DATA}`,
          JSON.stringify(error),
        ),
        buildContextLog('GenreRabbitmqController', 'handleGenreData'),
      );
      return;
    }

    const { title } = value;

    const createGenreDto = new CreateGenreDto(title);

    await this.genreManagerUseCase.updateOrCreateGenre(createGenreDto);
  }
}
