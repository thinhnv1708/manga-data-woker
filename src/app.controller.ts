import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PuppeteerManager } from './puppeteer/puppeteer.manager';
import { CrawlerService } from '@modules/crawler/crawler.service';
import { getSource } from './utils/source.util';
import {
  AbstractAddJobAdapter,
  AbstractMangaRepository,
} from '@core/abstracts';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private crawlerService: CrawlerService,
    private mangaRepository: AbstractMangaRepository,
    private bullAddJobAdapter: AbstractAddJobAdapter,
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
    // this.crawlerService.handleCrawlManga({
    //   url: getSource('/truyen-tranh/dao-hai-tac/77'),
    // });
    const data = await this.mangaRepository.findTotalMangaPathsMissingTitle();
    return data;
  }

  @Get('testListManga')
  async testListManga(): Promise<any> {
    const data1 = await this.mangaRepository.findMangaPathsMissingTitle(
      1,
      1000,
    );
    // const data2 = await this.mangaRepository.findMangaPathsMissingTitle(
    //   2,
    //   1000,
    // );
    // const data3 = await this.mangaRepository.findMangaPathsMissingTitle(
    //   3,
    //   1000,
    // );

    data1?.map((path, i) =>
      this.bullAddJobAdapter.addMangaJob('manga-crawler', {
        id: path,
        index: i,
      }),
    );
    return data1;
  }

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
