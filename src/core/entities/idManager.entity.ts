export class IdManager {
  private entityName: string;
  private currentId: number;

  constructor(entityName: string, currentId: number) {
    this.setEntityName(entityName).setCurrentId(currentId);
  }

  getEntityName(): string {
    return this.entityName;
  }

  setEntityName(entityName: string): IdManager {
    this.entityName = entityName;
    return this;
  }

  getCurrentId(): number {
    return this.currentId;
  }

  private setCurrentId(currentId: number): IdManager {
    this.currentId = currentId;
    return this;
  }
}
