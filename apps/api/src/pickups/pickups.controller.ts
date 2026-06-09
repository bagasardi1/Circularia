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
  @Roles(Role.ADMIN, Role.COLLECTION_POINT)
  @ApiOperation({ summary: 'Create new pickup request' })
  createPickup(@Body() body: { collectionPointId: string }) {
    return this.pickupsService.createPickup(body.collectionPointId);
  }

  @Post(':id/assign')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Assign driver to pickup' })
  assignDriver(@Param('id') pickupId: string, @Body() body: { driverId: string }) {
    return this.pickupsService.assignDriver(pickupId, body.driverId);
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