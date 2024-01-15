import { IRedisConfig } from '@configurations/interfaces';

export const makeRedisConfig = (
  redisConfig: IRedisConfig,
): {
  sentinels?: { host: string; port: number }[];
  host?: string;
  port?: number;
  name?: string;
  password?: string;
  db: number;
  keyPrefix?: string;
} => {
  const {
    HOST,
    PORT,
    SENTINEL,
    REDIS_CLUSTER_NAME,
    REDIS_CLUSTER_PASSWORD,
    DB,
    BASE_PREFIX,
  } = redisConfig;

  if (SENTINEL) {
    return {
      sentinels: SENTINEL,
      name: REDIS_CLUSTER_NAME,
      password: REDIS_CLUSTER_PASSWORD,
      db: DB,
      keyPrefix: BASE_PREFIX,
    };
  } else {
    return {
      host: HOST,
      port: PORT,
      db: DB,
      keyPrefix: BASE_PREFIX,
    };
  }
};
