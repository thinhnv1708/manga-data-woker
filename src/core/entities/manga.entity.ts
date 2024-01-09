export interface IMangaGenre {
  id: number;
  title: string;
}

export class Manga {
  private id: number;
  private source: string;
  private title: string;
  private subTitle: string;
  private thumbnail: string;
  private description: string;
  private genres: IMangaGenre[];
  private totalChapter: number;
  private status: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    source: string,
    title: string,
    subTitle: string,
    thumbnail: string,
    description: string,
    genres: IMangaGenre[],
    totalChapter: number,
    status: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.setId(id)
      .setSource(source)
      .setTitle(title)
      .setSubTitle(subTitle)
      .setThumbnail(thumbnail)
      .setDescription(description)
      .setGenres(genres)
      .setTotalChapter(totalChapter)
      .setStatus(status)
      .setCreatedAt(createdAt)
      .setUpdatedAt(updatedAt);
  }

  public setId(id: number): Manga {
    this.id = id;

    return this;
  }

  public getId(): number {
    return this.id;
  }

  public setSource(source: string): Manga {
    this.source = source;
    return this;
  }

  public getSource(): string {
    return this.source;
  }

  public setTitle(title: string): Manga {
    this.title = title;
    return this;
  }

  public getTitle(): string {
    return this.title;
  }

  public setSubTitle(subTitle: string): Manga {
    this.subTitle = subTitle;
    return this;
  }

  public getSubTitle(): string {
    return this.subTitle;
  }

  public setThumbnail(thumbnail: string): Manga {
    this.thumbnail = thumbnail;
    return this;
  }

  public getThumbnail(): string {
    return this.thumbnail;
  }

  public setDescription(description: string): Manga {
    this.description = description;
    return this;
  }

  public getDescription(): string {
    return this.description;
  }

  public setGenres(genres: IMangaGenre[]): Manga {
    this.genres = genres;
    return this;
  }

  public getGenres(): IMangaGenre[] {
    return this.genres;
  }

  public setTotalChapter(totalChapter: number): Manga {
    if (totalChapter < 0) {
      throw new Error('Invalid totalChapter: ' + totalChapter);
    }

    this.totalChapter = totalChapter;
    return this;
  }

  public getTotalChapter(): number {
    return this.totalChapter;
  }

  public setStatus(status: string): Manga {
    this.status = status;
    return this;
  }

  public getStatus(): string {
    return this.status;
  }

  public setCreatedAt(createdAt: Date): Manga {
    this.createdAt = createdAt;
    return this;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setUpdatedAt(updatedAt: Date): Manga {
    this.updatedAt = updatedAt;
    return this;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
