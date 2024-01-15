import { ISavePageInput } from './savePageInput.interface';

export interface IUpdatePagesInChapterInput {
  path: string;
  pages: ISavePageInput[];
}
