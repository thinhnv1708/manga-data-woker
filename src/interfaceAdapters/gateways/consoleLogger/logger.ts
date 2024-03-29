import { ILoggerConfig } from '@configurations/interfaces';
import { LOGGER } from '@constants/index';
import { AbstractLogger } from '@core/abstracts';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const { DEBUG_LEVEL } = LOGGER;

@Injectable()
export class Logger implements AbstractLogger {
  private logger: ConsoleLogger;
  private config: ILoggerConfig;

  constructor(configService: ConfigService) {
    this.config = configService.get<ILoggerConfig>('LOGGER_CONFIG');
    this.logger = new ConsoleLogger();
  }

  checkDebugMode(level: number): boolean {
    return this.config.DEBUG_MODE >= level;
  }

  log(message: string, context = '', level: number = DEBUG_LEVEL.BASIC): void {
    if (!this.checkDebugMode(level)) {
      return;
    }

    this.logger.log(message, context);
  }

  debug(message: string, context = '', level: number): void {
    if (!this.checkDebugMode(level)) {
      return;
    }

    this.logger.debug(message, context);
  }

  warn(message: string, context = '', level: number = DEBUG_LEVEL.TINY): void {
    if (!this.checkDebugMode(level)) {
      return;
    }

    this.logger.warn(message, context);
  }

  error(
    message: string,
    context = '',
    level: number = DEBUG_LEVEL.FORCE,
  ): void {
    if (!this.checkDebugMode(level)) {
      return;
    }

    this.logger.error(message, '', context);
  }
}
