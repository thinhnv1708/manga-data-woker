import crawlerConfig from '@configurations/crawler.config';
import { ISaveGenreInput } from '@core/dtos/abstracts/genre';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer-core';
// import * as cheerio from 'cheerio';

interface IPuppeteerManager {
  openNewPage(config: { url: string }): Promise<puppeteer.Page>;
}

@Injectable()
export class PuppeteerManager implements IPuppeteerManager {
  //Instance Của lớp PuppeteerManager
  private static instance: PuppeteerManager | null = null;
  // Đối tượng trình duyệt
  private browser: puppeteer.Browser;
  // Số trang đang mở
  private numberPages = 0;

  public static async getInstance(): Promise<PuppeteerManager> {
    // Logger.info(this.instance);
    if (this.instance == null) {
      this.instance = new PuppeteerManager();
      await this.instance.initialize();
    }
    return this.instance;
  }

  constructor() {
    console.log('PuppeteerManagerInit:', this.browser);
  }

  private async initialize(): Promise<void> {
    if (this.browser?.connected) return;
    try {
      this.browser = await puppeteer.launch({
        executablePath: crawlerConfig().PUPPETEER_CONFIG.executablePath,
        userDataDir: crawlerConfig().PUPPETEER_CONFIG.userDataDir,
        headless: false, // Chạy ẩn
        ignoreHTTPSErrors: true, // Bỏ qua lỗi https
        args: ['--disable-dev-shm-usage', '--no-sandbox'],
      });
    } catch (error) {
      throw error;
    }
  }

  public async openNewPage(config: { url: string }): Promise<puppeteer.Page> {
    const page = await this.browser.newPage();
    await page.goto(config.url);
    await page.setViewport({
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
    });
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    );
    await page.goto(config.url, {
      waitUntil: 'networkidle2',
    });
    await page.waitForSelector('main[class="main"]');
    return page;
  }

  public async getGenres(config: { url: string }) {
    try {
      const page = await this.openNewPage({ url: config.url });
      // await page.screenshot()
      const content = await page.content();
      const $ = cheerio.load(content);
      const genres: ISaveGenreInput[] = [];
      $('.layer-category-mb')
        .find('li')
        .each((i, el) => {
          const genre = $('a', el);
          const title = genre.text().trim();
          if (!!title) {
            console.log('i:', i, title);
            genres.push({
              title: title,
              source: genre.attr('href'),
              // description: genre.attr('data-title'),
              // url: genre.attr('href'),
            });
          }
        });
      return genres;
    } catch (error) {
      return [];
    }
  }

  public async getDescriptionManga(config: { url: string }) {
    try {
      const page = await this.openNewPage({ url: config.url });
      // await page.screenshot()
      const content = await page.content();
      const $ = cheerio.load(content);
      const comicDetail = $('#comic-detail .row');
      const title = $('.content-left .title-manga', comicDetail);
      const nameOther = $(
        '.content-left .name-other .detail-info',
        comicDetail,
      );
      // const authors = $('.content-left .author .detail-info', comicDetail);
      const status = $('.content-left .status .detail-info', comicDetail);
      const category = $('.content-left .category .detail-info', comicDetail);
      const summary = $('.summary-content .detail-summary', comicDetail);
      const imageInfo = $('.image-comic', comicDetail);
      const chapters: any[] = [];
      const genres: string[] = [];
      category.find('.cat-detail').each((i, el) => {
        const item = $('a', el);
        const href = item.attr('href');
        if (href.startsWith('http')) {
          genres.push(href);
          // genres.push({
          //   title: item.text(),
          //   url: href,
          // });
        }
      });

      $('#list-chapter-dt nav ul', comicDetail)
        .find('li .chapters')
        .each((i, el) => {
          const item = $('a', el);
          const href = item.attr('href');
          const extraData: any[] = [];
          $(el.parentNode)
            .find('.style-chap')
            .each((i, el) => {
              extraData.push($(el).text());
            });
          if (href.startsWith('http')) {
            chapters.push({
              title: item.text(),
              url: href,
              extraData: extraData,
            });
          }
        });

      const info: ISaveMangaInput = {
        // currentTime: Date.now(),
        source: config.url,
        title: title.text(),
        subTitle: nameOther.text(),
        genreSources: genres,
        status: status.text(),
        description: summary.text(),
        totalChapter: chapters.length,
        thumbnail: imageInfo.attr('src') || '',
      };

      return info;
    } catch (error) {
      console.log(error);
    }
  }
}
