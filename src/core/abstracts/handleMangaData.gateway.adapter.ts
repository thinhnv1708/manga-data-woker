import {
  ISaveChapterInput,
  IUpdatePagesInChapterInput,
} from '@core/dtos/abstracts/chapter';
import { ISaveGenreInput } from '@core/dtos/abstracts/genre';
import { ISaveMangaInput } from '@core/dtos/abstracts/manga';

export abstract class AbstractHandleMangaDataGatewayAdapter {
  abstract handleSaveGenre(data: ISaveGenreInput): Promise<void>;
  abstract handleSaveManga(data: ISaveMangaInput): Promise<void>;
  abstract handleSaveChapter(data: ISaveChapterInput): Promise<void>;
  abstract handleUpdatePagesInChapter(
    data: IUpdatePagesInChapterInput,
  ): Promise<void>;
}
