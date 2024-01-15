import { ISavePageInput } from './savePageInput.interface';

export interface IUpdatePagesInChapterInput {
  source: string;
  pages: ISavePageInput[];
}
