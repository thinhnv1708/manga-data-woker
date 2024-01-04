import { IAppConfig } from './interfaces';

export default (): {
  APP: IAppConfig;
} => ({
  APP: {
    SERVICE_TAG: process.env.SERVICE_TAG || 'base',
    PORT: Number(process.env.PORT) ?? 3000,
  },
});
