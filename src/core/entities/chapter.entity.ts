export interface IPage {
  position: number;
  source: string;
}

export interface IChapterManga {
  id: number;
  title: string;
}

export class Chapter {
  private id: number;
  private source: string;
  private manga: IChapterManga;
  private order: number;
  private pages: IPage[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    source: string,
    manga: IChapterManga,
    order: number,
    pages: IPage[],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.setId(id)
      .setSource(source)
      .setManga(manga)
      .setOrder(order)
      .setPages(pages)
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

  getSource(): string {
    return this.source;
  }

  setSource(source: string): Chapter {
    this.source = source;
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
