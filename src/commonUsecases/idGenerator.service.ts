import { AbstractIdGeneratorService } from '@core/abstract';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IdGeneratorService implements AbstractIdGeneratorService {
  generate(title: string): string {
    const asciiChars = this.stringToAscii(title);
    return asciiChars.join('');
  }

  private stringToAscii = (inputString: string): number[] => {
    const asciiArray: number[] = [];

    for (let i = 0; i < inputString.length; i++) {
      const charCode = inputString.charCodeAt(i);
      asciiArray.push(charCode);
    }

    return asciiArray;
  };
}
