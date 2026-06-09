import { Module } from '@nestjs/common';
import { PickupsService } from './pickups.service';
import { PickupsController } from './pickups.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [PickupsService],
  controllers: [PickupsController],
  exports: [PickupsService],
})
export class PickupsModule {}