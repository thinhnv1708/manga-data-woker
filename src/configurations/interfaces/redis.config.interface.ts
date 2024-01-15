export interface IRedisConfig {
  HOST: string;
  PORT: number;
  SENTINEL: {
    host: string;
    port: number;
  }[];
  REDIS_CLUSTER_NAME: string;
  REDIS_CLUSTER_PASSWORD: string;
  DB: number;
  BASE_PREFIX: string;
}
