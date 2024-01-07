import { COMMONS } from '@constants/index';
import { AbstractLoggerService } from '@core/abstract';
import { CreateChapterDto, CreateChapterPageDto } from '@core/dtos';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { buildContextLog, buildLogMessage } from 'src/utils';
import { ChapterManagerService } from './chapterManager.service';
const { RABBITMQ_PATTERN } = COMMONS;

@Controller()
export class ChapterRabbitmqController {
  constructor(
    private readonly chapterManagerService: ChapterManagerService,
    private readonly loggerService: AbstractLoggerService,
  ) {}

  @MessagePattern(RABBITMQ_PATTERN.CHAPTER_HANDLE_DATA)
  async handleChapterData(data: {
    mangaId: string;
    order: number;
    pages: { position: number; source: string }[];
  }): Promise<void> {
    this.loggerService.log(
      buildLogMessage(
        `Pattern ${RABBITMQ_PATTERN.CHAPTER_HANDLE_DATA}`,
        JSON.stringify(data),
      ),
      buildContextLog('ChapterRabbitmqController', 'handleChapterData'),
    );

    const { mangaId, order, pages } = data;

    const newPages = pages.map((page) => {
      const { position, source } = page;
      return new CreateChapterPageDto(position, source);
    });

    const createChapterDto = new CreateChapterDto(mangaId, order, newPages);

    await this.chapterManagerService.updateOrCreateChapter(createChapterDto);
  }
}
