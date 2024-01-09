import { ISavePageInput } from './savePageInput.interface';

export interface IUpdateChapterInput {
  source: string;
  pages: ISavePageInput[];
}
