import {
  appConfig,
  loggerConfig,
  mongodbConfig,
  rabbitmqConfig,
  redisConfig,
} from '@configurations/index';
import { MongooseModule } from '@frameworksAndDevices/databases/mongoose';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  ChapterModule,
  GenreModule,
  LoggerModule,
  MangaModule,
} from './modules';
import { BullModule } from '@nestjs/bull';
import { CrawlerModule } from '@modules/crawler/crawler.module';
import { IRedisConfig } from '@configurations/interfaces';
import { makeRedisConfig } from './helpers';
import { BullInitModule } from '@modules/bullInit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
        loggerConfig,
        mongodbConfig,
        rabbitmqConfig,
        redisConfig,
      ],
      envFilePath: ['.development.env'],
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get<IRedisConfig>('REDIS');
        return {
          redis: makeRedisConfig(redisConfig),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule,
    LoggerModule,
    GenreModule,
    MangaModule,
    ChapterModule,
    CrawlerModule,
    BullInitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
