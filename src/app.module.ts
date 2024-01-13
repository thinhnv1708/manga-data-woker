import {
  appConfig,
  loggerConfig,
  mongodbConfig,
  rabbitmqConfig,
} from '@configurations/index';
import { MongooseModule } from '@frameworksAndDevices/databases/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ChapterModule,
  GenreModule,
  LoggerModule,
  MangaModule,
} from './modules';
import { CrawlerModule } from '@modules/crawler/crawler.module';
// import { AgendaModule } from 'agenda-nest';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, loggerConfig, mongodbConfig, rabbitmqConfig],
      envFilePath: ['.development.env'],
    }),
    MongooseModule,
    LoggerModule,
    GenreModule,
    MangaModule,
    ChapterModule,
    // AgendaModule.forRoot({
    //   db: {
    //     address: mongodbConfig().MONGODB_CONFIG.SERVERS[0],
    //   },
    // }),
    CrawlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
