export class IdManager {
  private entityName: string;
  private currentId: number;

  getEntityName(): string {
    return this.entityName;
  }

  setEntityName(entityName: string): void {
    this.entityName = entityName;
  }

  getCurrentId(): number {
    return this.currentId;
  }
}
