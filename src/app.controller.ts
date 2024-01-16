import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PuppeteerManager } from './puppeteer/puppeteer.manager';
import { CrawlerService } from '@modules/crawler/crawler.service';
import { getSource } from './utils/source.util';

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
      url: getSource('/truyen-tranh/dao-hai-tac/77'),
    });
    return { data: data };
  }

  @Get('testManga')
  async testManga(): Promise<any> {
    this.crawlerService.handleCrawlManga({
      url: getSource('/truyen-tranh/dao-hai-tac/77'),
    });
  }

  @Get('testListManga')
  async testListManga(): Promise<any> {}

  // @Get('initCreateFullManga')
  private async initCreateFullManga(): Promise<any> {
    const puppeteer = await PuppeteerManager.getInstance();
    const total = await puppeteer.getTotalPage({
      url: getSource('/tim-truyen?status=2&sort=1'),
    });
    if (total) {
      for (let index = 1; index < total; index++) {
        await this.crawlerService.handleCrawlMangaList({
          url: getSource(`/tim-truyen?status=2&sort=1&page=${index}`),
        });
      }
    }
  }
}
