import { IAppConfig } from './interfaces';

export default (): {
  APP_CONFIG: IAppConfig;
} => ({
  APP_CONFIG: {
    SERVICE_TAG: process.env.SERVICE_TAG || 'base',
    PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    RETRY_SAVE_DATA_DELAY_SECONDS: process.env.RETRY_SAVE_DATA_DELAY_SECONDS
      ? Number(process.env.RETRY_SAVE_DATA_DELAY_SECONDS)
      : 60,
  },
});
