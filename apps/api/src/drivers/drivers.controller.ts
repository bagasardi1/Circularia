import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  Req,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { DriversService } from './drivers.service';
import { Role } from '@prisma/client';

@ApiTags('drivers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Get('profile')
  @Roles(Role.DRIVER)
  @ApiOperation({ summary: 'Get driver profile' })
  getProfile(@Req() req) {
    const driverId = req.user.id;
    const driver = this.driversService.getProfile(driverId);
    return driver;
  }

  @Put('status')
  @Roles(Role.DRIVER)
  @ApiOperation({ summary: 'Update driver status (AVAILABLE, BUSY, OFFLINE)' })
  updateStatus(@Req() req, @Body() body: { status: string }) {
    return this.driversService.updateStatus(req.user.id, body.status);
  }

  @Put('location')
  @Roles(Role.DRIVER)
  @ApiOperation({ summary: 'Update driver current location' })
  updateLocation(
    @Req() req,
    @Body() body: { latitude: number; longitude: number },
  ) {
    return this.driversService.updateLocation(
      req.user.id,
      body.latitude,
      body.longitude,
    );
  }

  @Get('stats')
  @Roles(Role.DRIVER)
  @ApiOperation({ summary: 'Get driver performance stats' })
  getStats(@Req() req) {
    return this.driversService.getDriverStats(req.user.id);
  }

  @Get('leaderboard')
  @ApiOperation({ summary: 'Get driver leaderboard' })
  getLeaderboard() {
    return this.driversService.getLeaderboard(10);
  }
}