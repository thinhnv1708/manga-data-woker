import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PuppeteerManager } from './puppeteer/puppeteer.manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health(): string {
    return 'OK';
  }

  @Get('test')
  async test(): Promise<any> {
    const puppeteer = await PuppeteerManager.getInstance();
    const data = await puppeteer.getDescriptionManga({
      url: 'https://www.toptruyenne.com/truyen-tranh/dao-hai-tac/77',
    });
    return { data: data };
  }
}
