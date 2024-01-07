import { Module } from '@nestjs/common';
import { ExecutePromiseUtility } from './executePromise.service';

@Module({
  providers: [ExecutePromiseUtility],
  exports: [ExecutePromiseUtility],
})
export class UtilityModule {}
