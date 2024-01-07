export class CreateChapterPageDto {
  private position: number;
  private source: string;

  constructor(position: number, source: string) {
    this.setPosition(position);
    this.setSource(source);
  }

  getPosition(): number {
    return this.position;
  }

  setPosition(position: number): void {
    if (position < 0) {
      throw new Error('Invalid position: ' + position);
    }

    this.position = position;
  }

  getSource(): string {
    return this.source;
  }

  setSource(source: string): void {
    this.source = source;
  }
}
