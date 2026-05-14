import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DriversModule } from './drivers/drivers.module';
import { CollectionPointsModule } from './collection-points/collection-points.module';
import { PickupsModule } from './pickups/pickups.module';
import { WasteModule } from './waste/waste.module';
import { TrackingModule } from './tracking/tracking.module';
import { AiModule } from './ai/ai.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { EducationModule } from './education/education.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, DriversModule, CollectionPointsModule, PickupsModule, WasteModule, TrackingModule, AiModule, MarketplaceModule, EducationModule, AnalyticsModule, NotificationsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
