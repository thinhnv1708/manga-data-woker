import { Module } from '@nestjs/common';
import { ExcuteProimseUtility } from './excutePromise.service';

@Module({ providers: [ExcuteProimseUtility], exports: [ExcuteProimseUtility] })
export class UtilityModule {}
