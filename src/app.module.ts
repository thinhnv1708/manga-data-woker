import {
  appConfig,
  loggerConfig,
  mongodbConfig,
  rabbitmqConfig,
} from '@configurations/index';
import { MongooseModule } from '@frameworks/mongoose';
import { ChapterModule } from '@modules/chapter/chapter.module';
import { GenreModule } from '@modules/genre/genre.module';
import { LoggerModule } from '@modules/logger/logger.module';
import { MangaModule } from '@modules/manga/manga.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, loggerConfig, mongodbConfig, rabbitmqConfig],
      envFilePath: ['.development.env'],
    }),
    LoggerModule,
    MongooseModule,
    GenreModule,
    MangaModule,
    ChapterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
