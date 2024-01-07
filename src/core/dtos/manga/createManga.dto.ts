export class CreateMangaDto {
  private title: string;
  private subTitle: string;
  private thumbnail: string;
  private description: string;
  private genres: string[];
  private status: string;

  constructor(
    title: string,
    subTitle: string,
    thumbnail: string,
    description: string,
    genres: string[],
    status: string,
  ) {
    this.setTitle(title);
    this.setSubTitle(subTitle);
    this.setThumbnail(thumbnail);
    this.setDescription(description);
    this.setGenres(genres);
    this.setStatus(status);
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  getSubTitle(): string {
    return this.subTitle;
  }

  setSubTitle(subTitle: string): void {
    this.subTitle = subTitle;
  }

  getThumbnail(): string {
    return this.thumbnail;
  }

  setThumbnail(thumbnail: string): void {
    this.thumbnail = thumbnail;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  getGenres(): string[] {
    return this.genres;
  }

  setGenres(genres: string[]): void {
    this.genres = genres;
  }

  getStatus(): string {
    return this.status;
  }

  setStatus(status: string): void {
    this.status = status;
  }
}
