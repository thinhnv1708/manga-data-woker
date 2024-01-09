export class Genre {
  id: number;
  source: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    source: string,
    title: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.setId(id)
      .setSource(source)
      .setTitle(title)
      .setCreatedAt(createdAt)
      .setUpdatedAt(updatedAt);
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): Genre {
    this.id = id;
    return this;
  }

  getSource(): string {
    return this.source;
  }

  setSource(source: string): Genre {
    this.source = source;
    return this;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): Genre {
    this.title = title;
    return this;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  setCreatedAt(createdAt: Date): Genre {
    this.createdAt = createdAt;
    return this;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  setUpdatedAt(updatedAt: Date): Genre {
    this.updatedAt = updatedAt;
    return this;
  }
}
