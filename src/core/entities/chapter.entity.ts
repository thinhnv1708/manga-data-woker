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
  private compeletedCrawler: boolean;
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
    compeletedCrawler: boolean,
    compeletedMapDependencies: boolean,
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
      .setCompeletedCrawler(compeletedCrawler)
      .setCompeletedMapDependencies(compeletedMapDependencies)
      .setRetryCount(retryCount)
      .setCreatedAt(createdAt)
      .setUpdatedAt(updatedAt);
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): Chapter {
    this.id = id;
    return this;
  }

  getPath(): string {
    return this.path;
  }

  setPath(path: string): Chapter {
    this.path = path;
    return this;
  }

  getMangaPath(): string {
    return this.mangaPath;
  }

  setMangaPath(mangaPath: string): Chapter {
    this.mangaPath = mangaPath;
    return this;
  }

  getManga(): IChapterManga {
    return this.manga;
  }

  setManga(manga: IChapterManga): Chapter {
    this.manga = manga;
    return this;
  }

  getOrder(): number {
    return this.order;
  }

  setOrder(order: number): Chapter {
    this.order = order;
    return this;
  }

  getPages(): IPage[] {
    return this.pages;
  }

  setPages(pages: IPage[]): Chapter {
    this.pages = pages;
    return this;
  }

  getExtraData(): string[] {
    return this.extraData;
  }

  setExtraData(extraData: string[]): Chapter {
    this.extraData = extraData;
    return this;
  }

  getCompeletedCrawler(): boolean {
    return this.compeletedCrawler;
  }

  setCompeletedCrawler(compeletedCrawler: boolean): Chapter {
    this.compeletedCrawler = compeletedCrawler;
    return this;
  }

  getCompeletedMapDependencies(): boolean {
    return this.compeletedCrawler;
  }

  setCompeletedMapDependencies(compeletedMapDependencies: boolean): Chapter {
    this.compeletedCrawler = compeletedMapDependencies;
    return this;
  }

  getRetryCount(): number {
    return this.retryCount;
  }

  setRetryCount(retryCount: number): Chapter {
    this.retryCount = retryCount;
    return this;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(createdAt: Date): Chapter {
    this.createdAt = createdAt;
    return this;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: Date): Chapter {
    this.updatedAt = updatedAt;
    return this;
  }
}
