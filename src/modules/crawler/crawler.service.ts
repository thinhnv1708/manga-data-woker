import { AbstractHandleMangaDataGatewayAdapter } from '@core/abstracts';
import { Injectable } from '@nestjs/common';
import { PuppeteerManager } from 'src/puppeteer/puppeteer.manager';
// const puppeteerManger = PuppeteerManager.getInstance();

@Injectable()
export class CrawlerService {
  constructor(
    private readonly handleMangaDataGatewayAdapter: AbstractHandleMangaDataGatewayAdapter,
  ) {
    this.handleCrawlGenres();
  }

  async handleCrawlGenres() {
    const puppeteerManger = await PuppeteerManager.getInstance();
    const genres = await puppeteerManger.getGenres({
      url: 'https://www.toptruyenne.com/tim-truyen',
    });
    await Promise.all(
      genres.map((genre) =>
        this.handleMangaDataGatewayAdapter.handleSaveGenre(genre),
      ),
    );
  }
}
