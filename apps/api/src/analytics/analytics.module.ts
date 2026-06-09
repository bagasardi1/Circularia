import { Module } from '@nestjs/common';
import { GamificationService } from './analytics.service';
import { GamificationController } from './analytics.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GamificationService],
  controllers: [GamificationController],
  exports: [GamificationService],
})
export class AnalyticsModule {}