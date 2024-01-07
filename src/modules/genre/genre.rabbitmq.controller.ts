import { COMMONS } from '@constants/index';
import { AbstractLoggerService } from '@core/abstract';
import { CreateGenreDto } from '@core/dtos';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { buildContextLog, buildLogMessage } from 'src/utils';
import { GenreManagerService } from './genreManager.service';
const { RABBITMQ_PATTERN } = COMMONS;

@Controller()
export class GenreRabbitmqController {
  constructor(
    private readonly genreManagerService: GenreManagerService,
    private readonly loggerService: AbstractLoggerService,
  ) {}

  @MessagePattern(RABBITMQ_PATTERN.GENRE_HANDLE_DATA)
  async handleGenreData(data: { title: string }): Promise<void> {
    this.loggerService.log(
      buildLogMessage(
        `Pattern ${RABBITMQ_PATTERN.GENRE_HANDLE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog('GenreRabbitmqController', 'handleGenreData'),
    );

    const { title } = data;
    const createGenreDto = new CreateGenreDto(title);

    await this.genreManagerService.updateOrCreateGenre(createGenreDto);
  }
}
