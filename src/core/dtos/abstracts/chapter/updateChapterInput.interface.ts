import { ISavePageInput } from './savePageInput.interface';

export interface IUpdatePagesInChapterInput {
  chapterPath: string;
  pages: ISavePageInput[];
  status: string;
}
