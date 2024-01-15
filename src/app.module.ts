import {
  appConfig,
  loggerConfig,
  mongodbConfig,
  rabbitmqConfig,
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
import { CrawlerModule } from '@modules/crawler/crawler.module';
import { AgendaModule } from 'agenda-nest';
import { IMongodbConfig } from '@configurations/interfaces';
import { makeMongodbConfig } from './helpers';

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
    AgendaModule.forRootAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mongooseConfig =
          configService.get<IMongodbConfig>('MONGODB_CONFIG');
        const uri = makeMongodbConfig(mongooseConfig);
        return {
          db: {
            address: uri,
          },
        };
      },
    }),
    CrawlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
