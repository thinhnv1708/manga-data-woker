import { CreateChapterPageDto } from './createChapterPage.dto';

export class CreateChapterDto {
  private mangaTitle: string;
  private order: number;
  private pages: CreateChapterPageDto[];

  constructor(
    mangaTitle: string,
    order: number,
    pages: CreateChapterPageDto[],
  ) {
    this.setMangaTitle(mangaTitle);
    this.setOrder(order);
    this.setPages(pages);
  }

  getMangaTitle(): string {
    return this.mangaTitle;
  }

  setMangaTitle(mangaTitle: string): void {
    this.mangaTitle = mangaTitle;
  }

  getOrder(): number {
    return this.order;
  }

  setOrder(order: number): void {
    this.order = order;
  }

  getPages(): CreateChapterPageDto[] {
    return this.pages;
  }

  setPages(pages: CreateChapterPageDto[]): void {
    this.pages = pages;
  }
}
