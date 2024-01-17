import {
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

  async handleRetry(
    retryVersion: number,
    page: number,
    limit: number,
  ): Promise<void> {
    const chapters = await this.chapterRepository.findChaptersByRetryVersion(
      retryVersion,
      page,
      limit,
    );

    if (chapters.length === 0) {
      return;
    }
    console.log('vao xu ly chapter');

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
    console.log('bat dau gui queue');
    await Promise.all(
      saveChaptersData.map((saveChapterData) =>
        this.handleMangaDataGatewayAdapter.handleSaveChapter(saveChapterData),
      ),
    );
    console.log('gui xong queue');
  }
}
