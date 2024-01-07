export class CreateGenreDto {
  private title: string;

  constructor(title: string) {
    this.setTitle(title);
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
  }
}
