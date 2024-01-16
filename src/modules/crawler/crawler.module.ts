import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
// import { HandleMangaDataRabbitmqGatewayAdapter } from '@interfaceAdapters/gateways/rabbitmq';
// import { AbstractHandleMangaDataGatewayAdapter } from '@core/abstracts';
import { HandleMangaDataAdapterModule } from '..';
import { MangaBullConsumer } from '@interfaceAdapters/controllers/bull';

@Module({
  imports: [HandleMangaDataAdapterModule],
  providers: [CrawlerService, MangaBullConsumer],
  exports: [CrawlerService],
})
export class CrawlerModule {}
