import {
  AbstractAddJobAdapter,
  AbstractChapterRepository,
  AbstractLogger,
} from '@core/abstracts';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddRetryChunkUseCase {
  constructor(
    private readonly chapterRepository: AbstractChapterRepository,
    private readonly addJobAdapter: AbstractAddJobAdapter,
    private readonly logger: AbstractLogger,
  ) {
    // this.handleAddRetryChunk(500);
  }

  async handleAddRetryChunk(chunkItemNumber: number): Promise<void> {
    const { total, retryVersion } =
      await this.chapterRepository.findTotalAndMarkRetryVersion();

    const totalPages = Math.ceil(total / chunkItemNumber);

    this.logger.log(
      `Total pages: ${totalPages}`,
      'ADD_RETRY_CHUNK_USE_CASE.handleAddRetryChunk',
    );

    for (let page = 1; page <= totalPages; page++) {
      await this.addJobAdapter.retrySaveChapterJob(
        retryVersion,
        page,
        chunkItemNumber,
      );
    }
  }
}
