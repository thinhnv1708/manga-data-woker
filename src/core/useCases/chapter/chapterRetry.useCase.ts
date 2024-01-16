import {
  AbstractAddJobAdapter,
  AbstractChapterRepository,
  AbstractHandleMangaDataGatewayAdapter,
} from '@core/abstracts';
import { ISaveChapterInput } from '@core/dtos/abstracts/chapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChapterRetryUseCase {
  constructor(
    private readonly chapterRepository: AbstractChapterRepository,
    private readonly handleMangaDataGatewayAdapter: AbstractHandleMangaDataGatewayAdapter,
  ) {}

  async handleRetry(page: number, limit: number): Promise<void> {
    const chapters =
      await this.chapterRepository.findNotCompletedMapDependenciesChapters(
        page,
        limit,
      );

    const saveChaptersData: ISaveChapterInput[] = chapters.map((chapter) => {
      const mangaPath = chapter.getMangaPath();
      const path = chapter.getPath();
      const order = chapter.getOrder();
      const extraData = chapter.getExtraData();

      return {
        mangaPath,
        path,
        order,
        extraData,
      };
    });
  }

  async concurrencyRequest(
    saveChaptersData: ISaveChapterInput[],
    maxNum: number,
    currentIndex: number = 0,
  ): Promise<void> {
    if (saveChaptersData.length < currentIndex) {
      return;
    }

    
  }
}
