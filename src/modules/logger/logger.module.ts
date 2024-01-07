import { AbstractLoggerService } from '@core/abstract';
import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global()
@Module({
  providers: [{ provide: AbstractLoggerService, useClass: LoggerService }],
  exports: [AbstractLoggerService],
})
export class LoggerModule {}
