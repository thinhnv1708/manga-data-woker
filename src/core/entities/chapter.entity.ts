export interface IPage {
  position: number;
  path: string;
}

export interface IChapterManga {
  id: number;
  title: string;
}

export class Chapter {
  private id: number;
  private path: string;
  private mangaPath: string;
  private manga: IChapterManga;
  private order: number;
  private pages: IPage[];
  private extraData: string[];
  private completedCrawler: boolean;
  private completedMapDependencies: boolean;
  private retryCount: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    path: string,
    mangaPath: string,
    manga: IChapterManga,
    order: number,
    pages: IPage[],
    extraData: string[],
    completedCrawler: boolean,
    completedMapDependencies: boolean,
    retryCount: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.setId(id)
      .setPath(path)
      .setMangaPath(mangaPath)
      .setManga(manga)
      .setOrder(order)
      .setPages(pages)
      .setExtraData(extraData)
      .setCompletedCrawler(completedCrawler)
      .setCompletedMapDependencies(completedMapDependencies)
      .setRetryCount(retryCount)
      .setCreatedAt(createdAt)
      .setUpdatedAt(updatedAt);
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): this {
    this.id = id;
    return this;
  }

  getPath(): string {
    return this.path;
  }

  setPath(path: string): this {
    this.path = path;
    return this;
  }

  getMangaPath(): string {
    return this.mangaPath;
  }

  setMangaPath(mangaPath: string): this {
    this.mangaPath = mangaPath;
    return this;
  }

  getManga(): IChapterManga {
    return this.manga;
  }

  setManga(manga: IChapterManga): this {
    this.manga = manga;
    return this;
  }

  getOrder(): number {
    return this.order;
  }

  setOrder(order: number): this {
    this.order = order;
    return this;
  }

  getPages(): IPage[] {
    return this.pages;
  }

  setPages(pages: IPage[]): this {
    this.pages = pages;
    return this;
  }

  getExtraData(): string[] {
    return this.extraData;
  }

  setExtraData(extraData: string[]): this {
    this.extraData = extraData;
    return this;
  }

  getCompletedCrawler(): boolean {
    return this.completedCrawler;
  }

  setCompletedCrawler(completedCrawler: boolean): this {
    this.completedCrawler = completedCrawler;
    return this;
  }

  getCompletedMapDependencies(): boolean {
    return this.completedMapDependencies;
  }

  setCompletedMapDependencies(completedMapDependencies: boolean): this {
    this.completedMapDependencies = completedMapDependencies;
    return this;
  }

  getRetryCount(): number {
    return this.retryCount;
  }

  setRetryCount(retryCount: number): this {
    this.retryCount = retryCount;
    return this;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(createdAt: Date): this {
    this.createdAt = createdAt;
    return this;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: Date): this {
    this.updatedAt = updatedAt;
    return this;
  }
}
