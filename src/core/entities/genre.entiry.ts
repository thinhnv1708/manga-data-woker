export class Genre {
  private id: string;
  private title: string;
  private slug: string;
  private createdAt: Date;
  private updatedAt: Date;

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

  getSlug(): string {
    return this.slug;
  }

  setSlug(slug: string): void {
    this.slug = slug;
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
