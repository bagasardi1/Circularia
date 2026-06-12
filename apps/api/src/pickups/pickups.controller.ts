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
import { PickupsService } from './pickups.service';
import { Role } from '@prisma/client';

@ApiTags('pickups')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('pickups')
export class PickupsController {
  constructor(private readonly pickupsService: PickupsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.COLLECTION_POINT, Role.USER)
  @ApiOperation({ summary: 'Create new pickup request' })
  createPickup(@Req() req, @Body() body: { collectionPointId?: string, address?: string, scheduledAt?: string }) {
    return this.pickupsService.createPickup(req.user.id, body);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pickups for current user/driver' })
  getMyPickups(@Req() req) {
    return this.pickupsService.getMyPickups(req.user.id, req.user.role);
  }

  @Get('available')
  @Roles(Role.DRIVER, Role.ADMIN)
  @ApiOperation({ summary: 'Get available pending pickups for drivers' })
  getAvailablePickups() {
    return this.pickupsService.getAvailablePickups();
  }

  @Get('stats')
  @Roles(Role.DRIVER)
  @ApiOperation({ summary: 'Get driver statistics' })
  getDriverStats(@Req() req) {
    return this.pickupsService.getDriverStats(req.user.id);
  }

  @Post(':id/assign')
  @Roles(Role.DRIVER, Role.ADMIN)
  @ApiOperation({ summary: 'Assign driver to pickup' })
  assignDriver(@Req() req, @Param('id') pickupId: string, @Body() body: { driverId?: string }) {
    // If DRIVER requests, assign to themselves. If ADMIN, use body.driverId
    const driverToAssign = req.user.role === 'DRIVER' ? null : (body.driverId ?? null);
    return this.pickupsService.assignDriver(pickupId, driverToAssign, req.user.id);
  }

  @Put(':id/status')
  @Roles(Role.DRIVER, Role.ADMIN)
  @ApiOperation({ summary: 'Update pickup status' })
  updateStatus(@Param('id') pickupId: string, @Body() body: { status: string }) {
    return this.pickupsService.updatePickupStatus(pickupId, body.status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get pickup details with history & tracking' })
  getDetails(@Param('id') pickupId: string) {
    return this.pickupsService.getPickupDetails(pickupId);
  }
}

