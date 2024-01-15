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
      url: 'https://www.toptruyenhot.co/tim-truyen',
    });
    await Promise.all(
      genres.map((genre) =>
        this.handleMangaDataGatewayAdapter.handleSaveGenre(genre),
      ),
    );
  }

  async handleCrawlManga(config: { url: string }) {
    const puppeteerManger = await PuppeteerManager.getInstance();
    const mangaDescription = await puppeteerManger.getDescriptionManga({
      url: config.url,
    });
    console.log('mangaDescription0', mangaDescription);
    if (mangaDescription?.manga) {
      try {
        await this.handleMangaDataGatewayAdapter.handleSaveManga(
          mangaDescription.manga,
        );
      } catch (error) {}

      try {
        console.log('mangaDescription1', mangaDescription);
        Promise.all(
          mangaDescription.chapters.map((chapter) =>
            this.handleMangaDataGatewayAdapter.handleSaveChapter(chapter),
          ),
        );
      } catch (error) {}
    }
  }
}
