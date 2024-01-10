import crawlerConfig from '@configurations/crawler.config';
import * as puppeteer from 'puppeteer-core';
// import * as cheerio from 'cheerio';

interface IPuppeteerManager {
  openNewPage(config: { url: string }): Promise<puppeteer.Page>;
}

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

  private constructor() {
    console.log('PuppeteerManagerInit:', this.browser);
  }

  private async initialize(): Promise<void> {
    if (this.browser.connected) return;
    try {
      this.browser = await puppeteer.launch({
        executablePath: crawlerConfig().PUPPETEER_CONFIG.executablePath,
        userDataDir: crawlerConfig().PUPPETEER_CONFIG.userDataDir,
        headless: true, // Chạy ẩn
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
}
