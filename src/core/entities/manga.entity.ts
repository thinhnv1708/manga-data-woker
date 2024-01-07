export class Manga {
  private id: string;
  private title: string;
  private subTitle: string;
  private thumbnail: string;
  private description: string;
  private genreIds: string[];
  private totalChapter: number;
  private status: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: string,
    title: string,
    subTitle: string,
    thumbnail: string,
    description: string,
    genreIds: string[],
    totalChapter: number,
    status: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.setId(id);
    this.setTitle(title);
    this.setSubTitle(subTitle);
    this.setThumbnail(thumbnail);
    this.setDescription(description);
    this.setGenreIds(genreIds);
    this.setTotalChapter(totalChapter);
    this.setStatus(status);
    this.setCreatedAt(createdAt);
    this.setUpdatedAt(updatedAt);
  }

  public setId(id: string): void {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getTitle(): string {
    return this.title;
  }

  public setSubTitle(subTitle: string): void {
    this.subTitle = subTitle;
  }

  public getSubTitle(): string {
    return this.subTitle;
  }

  public setThumbnail(thumbnail: string): void {
    this.thumbnail = thumbnail;
  }

  public getThumbnail(): string {
    return this.thumbnail;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public getDescription(): string {
    return this.description;
  }

  public setGenreIds(genreIds: string[]): void {
    this.genreIds = genreIds;
  }

  public getGenreIds(): string[] {
    return this.genreIds;
  }

  public setTotalChapter(totalChapter: number): void {
    if (totalChapter < 0) {
      throw new Error('Invalid totalChapter: ' + totalChapter);
    }

    this.totalChapter = totalChapter;
  }

  public getTotalChapter(): number {
    return this.totalChapter;
  }

  public setStatus(status: string): void {
    this.status = status;
  }

  public getStatus(): string {
    return this.status;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
