import { Module } from '@nestjs/common';
import { CollectionPointsService } from './collection-points.service';
import { CollectionPointsController } from './collection-points.controller';

@Module({
  providers: [CollectionPointsService],
  controllers: [CollectionPointsController]
})
export class CollectionPointsModule {}
