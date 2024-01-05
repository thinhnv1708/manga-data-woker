import { IAppConfig } from './interfaces';

export default (): {
  APP_CONFIG: IAppConfig;
} => ({
  APP_CONFIG: {
    SERVICE_TAG: process.env.SERVICE_TAG || 'base',
    PORT: Number(process.env.PORT) ?? 3000,
  },
});
