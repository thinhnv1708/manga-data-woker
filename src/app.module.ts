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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
