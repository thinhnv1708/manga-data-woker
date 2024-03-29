export abstract class AbstractAddJobAdapter {
  abstract addGenreJob(jobName: string, data: any): Promise<void>;
  abstract addMangaJob(jobName: string, data: any): Promise<void>;
  abstract addChapterJob(jobName: string, data: any): Promise<void>;
  abstract retrySaveChapterJob(
    retryVersion: number,
    page: number,
    limit: number,
  ): Promise<void>;
}
