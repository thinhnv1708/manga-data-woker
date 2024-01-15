import { COMMONS, LOGGER } from '@constants/index';
import {
  AbstractHandleMangaDataGatewayAdapter,
  AbstractLogger,
} from '@core/abstracts';
import {
  ISaveChapterInput,
  IUpdateChapterInput,
} from '@core/dtos/abstracts/chapter';
import { ISaveGenreInput } from '@core/dtos/abstracts/genre';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { buildContextLog, buildLogMessage } from 'src/utils';
const { RABBITMQ_PATTERN, RABBITMQ_PUBLISHER } = COMMONS;
const { LOG_CONTEXT } = LOGGER;

@Injectable()
export class HandleMangaDataRabbitmqGatewayAdapter
  implements AbstractHandleMangaDataGatewayAdapter
{
  constructor(
    @Inject(RABBITMQ_PUBLISHER) private readonly client: ClientProxy,
    private readonly logger: AbstractLogger,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  async handleSaveGenre(data: ISaveGenreInput): Promise<void> {
    this.logger.log(
      buildLogMessage(
        `Push message to ${RABBITMQ_PATTERN.GENRE_HANDLE_SAVE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog(
        LOG_CONTEXT.HANDLE_PUSH_MANGA_DATA_RABBITMQ,
        'handleSaveGenre',
      ),
    );

    await this.client.emit(RABBITMQ_PATTERN.GENRE_HANDLE_SAVE_DATA, data);
  }

  async handleSaveManga(data: ISaveMangaInput): Promise<void> {
    this.logger.log(
      buildLogMessage(
        `Push message to ${RABBITMQ_PATTERN.MANGA_HANDLE_SAVE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog(
        LOG_CONTEXT.HANDLE_PUSH_MANGA_DATA_RABBITMQ,
        'handleSaveManga',
      ),
    );

    await this.client.emit(RABBITMQ_PATTERN.MANGA_HANDLE_SAVE_DATA, data);
  }

  async handleSaveChapter(data: ISaveChapterInput): Promise<void> {
    this.logger.log(
      buildLogMessage(
        `Push message to ${RABBITMQ_PATTERN.CHAPTER_HANDLE_SAVE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog(
        LOG_CONTEXT.HANDLE_PUSH_MANGA_DATA_RABBITMQ,
        'handleSaveChapter',
      ),
    );

    await this.client.emit(RABBITMQ_PATTERN.CHAPTER_HANDLE_SAVE_DATA, data);
  }

  async handleUpdateChapter(data: IUpdateChapterInput): Promise<void> {
    this.logger.log(
      buildLogMessage(
        `Push message to ${RABBITMQ_PATTERN.CHAPTER_HANDLE_UPDATE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog(
        LOG_CONTEXT.HANDLE_PUSH_MANGA_DATA_RABBITMQ,
        'handleUpdateChapter',
      ),
    );

    await this.client.emit(RABBITMQ_PATTERN.CHAPTER_HANDLE_UPDATE_DATA, data);
  }
}
