import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { TrackingService } from './tracking.service';
import { Role } from '@prisma/client';

@ApiTags('tracking')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post(':pickupId')
  @Roles(Role.DRIVER, Role.ADMIN)
  @ApiOperation({ summary: 'Create tracking entry for pickup' })
  createEntry(
    @Param('pickupId') pickupId: string,
    @Body() data: { stage: string; location: string; description?: string },
  ) {
    return this.trackingService.createTrackingEntry(pickupId, data);
  }

  @Get(':pickupId/timeline')
  @ApiOperation({ summary: 'Get waste tracking timeline' })
  getTimeline(@Param('pickupId') pickupId: string) {
    return this.trackingService.getTimeline(pickupId);
  }

  @Get(':pickupId/history')
  @ApiOperation({ summary: 'Get tracking history with duration' })
  getHistory(@Param('pickupId') pickupId: string) {
    return this.trackingService.getTrackingHistory(pickupId);
  }

  @Get(':pickupId/stats')
  @ApiOperation({ summary: 'Get tracking statistics' })
  getStats(@Param('pickupId') pickupId: string) {
    return this.trackingService.getTrackingStats(pickupId);
  }

  @Put(':pickupId/position')
  @Roles(Role.DRIVER, Role.ADMIN)
  @ApiOperation({ summary: 'Update waste position' })
  updatePosition(
    @Param('pickupId') pickupId: string,
    @Body() data: { stage: string; location: string },
  ) {
    return this.trackingService.updateWastePosition(
      pickupId,
      data.stage,
      data.location,
    );
  }
}