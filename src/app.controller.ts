import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PuppeteerManager } from './puppeteer/puppeteer.manager';
import { CrawlerService } from '@modules/crawler/crawler.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private crawlerService: CrawlerService,
  ) {}

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

  @Get('testManga')
  async testManga(): Promise<any> {
    // const puppeteer = await PuppeteerManager.getInstance();
    // const data = await puppeteer.getDescriptionManga({
    //   url: 'https://www.toptruyenne.com/truyen-tranh/dao-hai-tac/77',
    // });
    // return { data: data };
    this.crawlerService.handleCrawlManga({
      url: 'https://www.toptruyenhot.co/truyen-tranh/dao-hai-tac/77',
    });
  }
}
