import { COMMONS, LOGGER } from '@constants/index';
import { AbstractLogger } from '@core/abstracts';
import {
  ISaveChapterInput,
  IUpdateChapterInput,
} from '@core/dtos/abstracts/chapter';
import { ChapterManagerUseCase } from '@core/useCases';
import {
  saveChapterJoiSchema,
  updateChapterJoiSchema,
} from '@interfaceAdapters/presenters/joi';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { buildContextLog, buildLogMessage } from 'src/utils';
const { RABBITMQ_PATTERN } = COMMONS;
const { LOG_CONTEXT } = LOGGER;

@Controller()
export class ChapterControllerRabbitmq {
  constructor(
    private readonly chapterManagerUseCase: ChapterManagerUseCase,
    private readonly logger: AbstractLogger,
  ) {}

  @MessagePattern(RABBITMQ_PATTERN.CHAPTER_HANDLE_DATA)
  async handleChapterData(data: ISaveChapterInput): Promise<void> {
    this.logger.log(
      buildLogMessage(
        `Pattern ${RABBITMQ_PATTERN.CHAPTER_HANDLE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog(
        LOG_CONTEXT.CHAPTER_CONTROLLER_RABBITMQ,
        'handleChapterData',
      ),
    );

    const { error, value } = saveChapterJoiSchema.validate(data);

    if (error) {
      this.logger.error(
        buildLogMessage(
          `Pattern ${RABBITMQ_PATTERN.GENRE_HANDLE_DATA}`,
          JSON.stringify(data),
          error.message,
        ),
        buildContextLog(
          LOG_CONTEXT.CHAPTER_CONTROLLER_RABBITMQ,
          'handleChapterData',
        ),
      );
      return;
    }

    await this.chapterManagerUseCase.handleSaveChapter(
      <ISaveChapterInput>value,
    );
  }

  @MessagePattern(RABBITMQ_PATTERN.CHAPTER_HANDLE_UPDATE_DATA)
  async handleUpadteChapterData(data: IUpdateChapterInput): Promise<void> {
    this.logger.log(
      buildLogMessage(
        `Pattern ${RABBITMQ_PATTERN.CHAPTER_HANDLE_UPDATE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog(
        LOG_CONTEXT.CHAPTER_CONTROLLER_RABBITMQ,
        'handleUpadteChapterData',
      ),
    );

    const { error, value } = updateChapterJoiSchema.validate(data);

    if (error) {
      this.logger.error(
        buildLogMessage(
          `Pattern ${RABBITMQ_PATTERN.CHAPTER_HANDLE_UPDATE_DATA}`,
          JSON.stringify(data),
          error.message,
        ),
        buildContextLog(
          LOG_CONTEXT.CHAPTER_CONTROLLER_RABBITMQ,
          'handleUpadteChapterData',
        ),
      );
      return;
    }

    const chapter = await this.chapterManagerUseCase.updateChapter(
      <IUpdateChapterInput>value,
    );

    if (!chapter) {
      this.logger.error(
        buildLogMessage(
          `Pattern ${RABBITMQ_PATTERN.CHAPTER_HANDLE_UPDATE_DATA}`,
          JSON.stringify(data),
          'Chapter is not exists',
        ),
        buildContextLog(
          LOG_CONTEXT.CHAPTER_CONTROLLER_RABBITMQ,
          'handleUpadteChapterData',
        ),
      );
    }
  }
}
