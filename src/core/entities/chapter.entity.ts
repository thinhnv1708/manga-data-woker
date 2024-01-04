import { Page } from './page.entity';

export class Chapter {
  id: string;
  title: string;
  slug: string;
  mangaId: string;
  order: number;
  pages: Page[];
  createdAt: string;
  updatedAt: string;
}
