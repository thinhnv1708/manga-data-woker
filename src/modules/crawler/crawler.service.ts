/* eslint-disable @typescript-eslint/ban-types */
import { AbstractHandleMangaDataGatewayAdapter } from '@core/abstracts';
import { Injectable } from '@nestjs/common';
import { PuppeteerManager } from 'src/puppeteer/puppeteer.manager';
import { getSource } from 'src/utils/source.util';
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
      url: getSource('/tim-truyen'),
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
    if (mangaDescription?.manga) {
      try {
        await this.handleMangaDataGatewayAdapter.handleSaveManga(
          mangaDescription.manga,
        );
      } catch (error) {}

      try {
        Promise.all(
          mangaDescription.chapters.map((chapter) =>
            this.handleMangaDataGatewayAdapter.handleSaveChapter(chapter),
          ),
        );
      } catch (error) {}
    }
  }

  async handleCrawlMangaList(config: { url: string }) {
    const puppeteerManger = await PuppeteerManager.getInstance();
    const mangaList = await puppeteerManger.getListManga({
      url: config.url,
    });
    Promise.all(
      mangaList.listManga.map((manga) =>
        this.handleMangaDataGatewayAdapter.handleSaveManga(manga),
      ),
    );
  }
}
