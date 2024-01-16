
export abstract class AbstractAddJobAdapter {
  abstract addMangaJob(jobName: string, data: any): Promise<void>;
  abstract addChapterJob(jobName: string, data: any): Promise<void>;
  abstract retrySaveChapterJob(page: number, limit: number): Promise<void>;
}
