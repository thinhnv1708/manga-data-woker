import { ISaveChapterInput } from '@core/dtos/abstracts/chapter';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';

export abstract class AbstractAddJobAdapter {
  abstract addMangaJob(jobName: string, data: any): Promise<void>;
  abstract addChapterJob(jobName: string, data: any): Promise<void>;
  abstract retrySaveMangaJob(saveMangaInput: ISaveMangaInput): Promise<void>;
  abstract retrySaveChapterJob(
    saveChapterInput: ISaveChapterInput,
  ): Promise<void>;
}
