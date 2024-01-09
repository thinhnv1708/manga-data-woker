export abstract class AbstractIdManagerUseCase<T> {
  abstract generateId(): T;
}
