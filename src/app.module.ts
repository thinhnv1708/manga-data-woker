import { appConfig, loggerConfig, mongodbConfig } from '@configurations/index';
import { GenreModule } from '@modules/genre/genre.module';
import { LoggerModule } from '@modules/logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@frameworks/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, loggerConfig, mongodbConfig],
      envFilePath: ['.development.env'],
    }),
    LoggerModule,
    MongooseModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
