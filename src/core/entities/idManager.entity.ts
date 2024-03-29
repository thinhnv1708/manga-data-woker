export class IdManager {
  private entityName: string;
  private currentId: number;

  constructor(entityName: string, currentId: number) {
    this.setEntityName(entityName).setCurrentId(currentId);
  }

  getEntityName(): string {
    return this.entityName;
  }

  setEntityName(entityName: string): this {
    this.entityName = entityName;
    return this;
  }

  getCurrentId(): number {
    return this.currentId;
  }

  private setCurrentId(currentId: number): this {
    this.currentId = currentId;
    return this;
  }
}
