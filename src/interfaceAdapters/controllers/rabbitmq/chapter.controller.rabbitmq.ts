import { COMMONS, LOGGER } from '@constants/index';
import { AbstractLogger } from '@core/abstracts';
import {
  ISaveChapterInput,
  IUpdatePagesInChapterInput,
} from '@core/dtos/abstracts/chapter';
import { ChapterManagerUseCase } from '@core/useCases';
import {
  saveChapterJoiSchema,
  updatePagesInChapterJoiSchema,
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

  @MessagePattern(RABBITMQ_PATTERN.CHAPTER_HANDLE_SAVE_DATA)
  async handleChapterData(data: ISaveChapterInput): Promise<void> {
    this.logger.log(
      buildLogMessage(
        `Pattern ${RABBITMQ_PATTERN.CHAPTER_HANDLE_SAVE_DATA}`,
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
          `Pattern ${RABBITMQ_PATTERN.GENRE_HANDLE_SAVE_DATA}`,
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

  @MessagePattern(RABBITMQ_PATTERN.CHAPTER_HANDLE_UPDATE_PAGES_DATA)
  async handleUpadtePagesInChapter(
    data: IUpdatePagesInChapterInput,
  ): Promise<void> {
    this.logger.log(
      buildLogMessage(
        `Pattern ${RABBITMQ_PATTERN.CHAPTER_HANDLE_UPDATE_PAGES_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog(
        LOG_CONTEXT.CHAPTER_CONTROLLER_RABBITMQ,
        'handleUpadteChapterData',
      ),
    );

    const { error, value } = updatePagesInChapterJoiSchema.validate(data);

    if (error) {
      this.logger.error(
        buildLogMessage(
          `Pattern ${RABBITMQ_PATTERN.CHAPTER_HANDLE_UPDATE_PAGES_DATA}`,
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

    const chapter = await this.chapterManagerUseCase.updatePagesInChapter(
      <IUpdatePagesInChapterInput>value,
    );

    if (!chapter) {
      this.logger.error(
        buildLogMessage(
          `Pattern ${RABBITMQ_PATTERN.CHAPTER_HANDLE_UPDATE_PAGES_DATA}`,
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
