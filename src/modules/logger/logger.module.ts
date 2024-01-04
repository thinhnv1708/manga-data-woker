import { AbstractLoggerAdapter } from '@core/abtracts';
import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Module({
  providers: [{ provide: AbstractLoggerAdapter, useClass: LoggerService }],
  exports: [AbstractLoggerAdapter],
})
export class LoggerModule {}
