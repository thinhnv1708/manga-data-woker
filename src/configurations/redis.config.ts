import { IRedisConfig } from './interfaces';

export default (): { REDIS: IRedisConfig } => ({
  REDIS: {
    HOST: process.env.REDIS_HOST || 'localhost',
    PORT: Number(process.env.REDIS_PORT) || 6379, //  Redis port
    SENTINEL:
      process.env.REDIS_SENTINEL &&
      process.env.REDIS_SENTINEL.split(' ').map((path) => {
        const [host, port] = path.split(':');
        return {
          host,
          port: Number(port),
        };
      }),
    REDIS_CLUSTER_NAME: process.env.REDIS_CLUSTER_NAME,
    REDIS_CLUSTER_PASSWORD: process.env.REDIS_CLUSTER_PASSWORD,
    DB: Number(process.env.REDIS_DB) || 0,
    BASE_PREFIX: process.env.REDIS_BASE_PREFIX,
  },
});
