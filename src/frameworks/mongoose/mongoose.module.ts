import { IMongodbConfig } from '@configurations/interfaces';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MongooseModule as MongooseLibModule,
  MongooseModuleFactoryOptions,
} from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseLibModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongooseConfig =
          configService.get<IMongodbConfig>('MONGODB_CONFIG');
        const {
          SERVERS: servers,
          USERNAME: user,
          PASSWORD: password,
          AUTH_SOURCE: authSource,
          REPL: repl,
          DB_NAME: dbName,
        } = mongooseConfig;

        if (!dbName) {
          throw new Error('Database name is not defined');
        }

        const uri = (() => {
          const url = servers.reduce((prev, cur) => prev + cur + ',', '');

          if (user && password) {
            return (
              `mongodb://${user}:${password}@${url.substring(
                0,
                url.length - 1,
              )}/${dbName}?authSource=` +
              (authSource ? authSource : 'admin') +
              (repl ? `&replicaSet=${repl}` : '')
            );
          } else {
            return (
              `mongodb://${url.substring(0, url.length - 1)}/${dbName}` +
              (repl ? `?replicaSet=${repl}` : '')
            );
          }
        })();

        return <MongooseModuleFactoryOptions>{
          uri,
          useUnifiedTopology: true,
          useNewUrlParser: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MongooseModule {}
