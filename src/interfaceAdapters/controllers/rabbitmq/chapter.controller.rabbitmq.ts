import { COMMONS } from '@constants/index';
import { AbstractLogger } from '@core/abstracts';
import { CreateChapterDto, CreateChapterPageDto } from '@core/dtos';
import { ChapterManagerUseCase } from '@core/useCases';
import { createChapterJoiSchema } from '@interfaceAdapters/presenters/joi';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { buildContextLog, buildLogMessage } from 'src/utils';
const { RABBITMQ_PATTERN } = COMMONS;

@Controller()
export class ChapterControllerRabbitmq {
  constructor(
    private readonly chapterManagerUseCase: ChapterManagerUseCase,
    private readonly logger: AbstractLogger,
  ) {}

  @MessagePattern(RABBITMQ_PATTERN.CHAPTER_HANDLE_DATA)
  async handleChapterData(data: {
    mangaId: string;
    order: number;
    pages: { position: number; source: string }[];
  }): Promise<void> {
    this.logger.log(
      buildLogMessage(
        `Pattern ${RABBITMQ_PATTERN.CHAPTER_HANDLE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog('ChapterRabbitmqController', 'handleChapterData'),
    );

    const { error, value } = createChapterJoiSchema.validate(data);

    if (error) {
      this.logger.error(
        buildLogMessage(
          `Pattern ${RABBITMQ_PATTERN.GENRE_HANDLE_DATA}`,
          JSON.stringify(error),
        ),
        buildContextLog('ChapterRabbitmqController', 'handleChapterData'),
      );
      return;
    }

    const { mangaId, order, pages } = value;

    const newPages = pages.map((page) => {
      const { position, source } = page;
      return new CreateChapterPageDto(position, source);
    });

    const createChapterDto = new CreateChapterDto(mangaId, order, newPages);

    await this.chapterManagerUseCase.updateOrCreateChapter(createChapterDto);
  }
}
