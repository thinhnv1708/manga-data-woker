import { AbstractIdManagerRepository } from '@core/abstracts';
import { IdManagerRepository } from '@interfaceAdapters/gateways/mongoose/repositories/idManager.repository';
import {
  IdManager,
  IdManagerSchema,
} from '@interfaceAdapters/gateways/mongoose/schemas';
import { IdManagerMapper } from '@interfaceAdapters/presenters/mongoose';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: IdManager.name, schema: IdManagerSchema },
    ]),
  ],
  providers: [
    { provide: AbstractIdManagerRepository, useClass: IdManagerRepository },
    IdManagerMapper,
  ],
  exports: [AbstractIdManagerRepository],
})
export class IdGeneratorModule {}
