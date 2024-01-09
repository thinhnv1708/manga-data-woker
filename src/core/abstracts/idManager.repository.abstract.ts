export abstract class AbstractIdManagerRepository {
  abstract getId(entityName: string): Promise<number>;
}
