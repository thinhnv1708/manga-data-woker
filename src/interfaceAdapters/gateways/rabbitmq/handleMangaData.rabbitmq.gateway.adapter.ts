import { COMMONS } from '@constants/index';
import { AbstractHandleMangaDataGatewayAdapter } from '@core/abstracts';
import {
  ISaveChapterInput,
  IUpdateChapterInput,
} from '@core/dtos/abstracts/chapter';
import { ISaveGenreInput } from '@core/dtos/abstracts/genre';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
const { RABBITMQ_PATTERN, RABBITMQ_PUBLISHER } = COMMONS;

@Injectable()
export class HandleMangaDataRabbitmqGatewayAdapter
  implements AbstractHandleMangaDataGatewayAdapter
{
  constructor(@Inject(RABBITMQ_PUBLISHER) private client: ClientProxy) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  async handleSaveGenre(data: ISaveGenreInput): Promise<void> {
    await this.client.emit(RABBITMQ_PATTERN.GENRE_HANDLE_SAVE_DATA, data);
  }

  async handleSaveManga(data: ISaveMangaInput): Promise<void> {
    await this.client.emit(RABBITMQ_PATTERN.MANGA_HANDLE_SAVE_DATA, data);
  }

  async handleSaveChapter(data: ISaveChapterInput): Promise<void> {
    await this.client.emit(RABBITMQ_PATTERN.CHAPTER_HANDLE_SAVE_DATA, data);
  }

  async handleUpdateChapter(data: IUpdateChapterInput): Promise<void> {
    await this.client.emit(RABBITMQ_PATTERN.CHAPTER_HANDLE_UPDATE_DATA, data);
  }
}
