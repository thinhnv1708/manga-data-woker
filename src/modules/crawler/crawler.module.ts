import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
// import { HandleMangaDataRabbitmqGatewayAdapter } from '@interfaceAdapters/gateways/rabbitmq';
// import { AbstractHandleMangaDataGatewayAdapter } from '@core/abstracts';
import { HandleMangaDataAdapterModule } from '..';

@Module({
  imports: [HandleMangaDataAdapterModule],
  providers: [CrawlerService],
})
export class CrawlerModule {}
