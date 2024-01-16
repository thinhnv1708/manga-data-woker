export class Genre {
  id: number;
  path: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    path: string,
    title: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.setId(id)
      .setPath(path)
      .setTitle(title)
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

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): this {
    this.title = title;
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
