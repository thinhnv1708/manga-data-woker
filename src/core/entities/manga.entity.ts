export interface IMangaGenre {
  id: number;
  title: string;
}

export class Manga {
  private id: number;
  private path: string;
  private title: string;
  private subTitle: string;
  private thumbnail: string;
  private description: string;
  private genrePaths: string[];
  private genres: IMangaGenre[];
  private totalChapter: number;
  private status: string;
  private completedMapDependencies: boolean;
  private retryCount: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    path: string,
    title: string,
    subTitle: string,
    thumbnail: string,
    description: string,
    genrePaths: string[],
    genres: IMangaGenre[],
    totalChapter: number,
    status: string,
    completedMapDependencies: boolean,
    retryCount: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.setId(id)
      .setPath(path)
      .setTitle(title)
      .setSubTitle(subTitle)
      .setThumbnail(thumbnail)
      .setDescription(description)
      .setGenrePaths(genrePaths)
      .setGenres(genres)
      .setTotalChapter(totalChapter)
      .setStatus(status)
      .setcompletedMapDependencies(completedMapDependencies)
      .setRetryCount(retryCount)
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

  public setPath(path: string): Manga {
    this.path = path;
    return this;
  }

  public getPath(): string {
    return this.path;
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

  public setGenrePaths(genrePaths: string[]): Manga {
    this.genrePaths = genrePaths;
    return this;
  }

  public getGenrePaths(): string[] {
    return this.genrePaths;
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

  public setcompletedMapDependencies(
    completedMapDependencies: boolean,
  ): Manga {
    this.completedMapDependencies = completedMapDependencies;
    return this;
  }

  public getcompletedMapDependencies(): boolean {
    return this.completedMapDependencies;
  }

  public setRetryCount(retryCount: number): Manga {
    this.retryCount = retryCount;
    return this;
  }

  public getRetryCount(): number {
    return this.retryCount;
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
