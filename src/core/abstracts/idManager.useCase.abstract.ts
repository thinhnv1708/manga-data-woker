export abstract class AbstractIdManagerUseCase {
  abstract generateId(): Promise<number>;
}
