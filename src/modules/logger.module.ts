import { AbstractLogger } from '@core/abstracts';
import { Logger } from '@interfaceAdapters/gateways/consoleLogger';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [{ provide: AbstractLogger, useClass: Logger }],
  exports: [AbstractLogger],
})
export class LoggerModule {}
