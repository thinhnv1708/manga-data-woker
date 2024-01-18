export const RABBITMQ_PATTERN = {
  GENRE_HANDLE_SAVE_DATA: 'genre.handleSaveData',
  MANGA_HANDLE_SAVE_DATA: 'manga.handleSaveData',
  CHAPTER_HANDLE_SAVE_DATA: 'chapter.handleSaveData',
  CHAPTER_HANDLE_UPDATE_PAGES_DATA: 'chapter.handleUpdatePagesData',
};

export const RABBITMQ_PUBLISHER = 'manga';

export const BULL_QUEUE_NAMES = {
  GENRE: 'genre',
  MANGA: 'manga',
  CHAPTER: 'chapter',
  RETRY_SAVE_MANGA: 'retrySaveManga',
  RETRY_SAVE_CHAPTER: 'retrySaveChapter',
};

export const HIDDEN_STATUS = 'hidden';
