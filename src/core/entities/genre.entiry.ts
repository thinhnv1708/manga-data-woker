export class Genre {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, title: string, createdAt: Date, updatedAt: Date) {
    this.setId(id);
    this.setTitle(title);
    this.setCreatedAt(createdAt);
    this.setUpdatedAt(updatedAt);
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): void {
    this.id = id;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
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
