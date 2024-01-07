export abstract class AbstractIdGeneratorService {
  abstract generate(title: string): string;
}
