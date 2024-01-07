import { Page } from './page.entity';

export class Chapter {
  private mangaId: string;
  private order: number;
  private pages: Page[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    mangaId: string,
    order: number,
    pages: Page[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.setMangaId(mangaId);
    this.setOrder(order);
    this.setPages(pages);
    this.setCreatedAt(createdAt);
    this.setUpdatedAt(updatedAt);
  }

  getMangaId(): string {
    return this.mangaId;
  }

  setMangaId(mangaId: string): void {
    this.mangaId = mangaId;
  }

  getOrder(): number {
    return this.order;
  }

  setOrder(order: number): void {
    this.order = order;
  }

  getPages(): Page[] {
    return this.pages;
  }

  setPages(pages: Page[]): void {
    this.pages = pages;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
