import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { WasteService } from './waste.service';
import { Role } from '@prisma/client';

@ApiTags('waste')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('waste')
export class WasteController {
  constructor(private readonly wasteService: WasteService) {}

  @Post('reports')
  @Roles(Role.COLLECTION_POINT, Role.ADMIN)
  @ApiOperation({ summary: 'Create waste report' })
  createReport(
    @Body() data: { collectionPointId: string; type: string; weight: number; imageUrl?: string },
  ) {
    return this.wasteService.createWasteReport(data.collectionPointId, data);
  }

  @Get('reports')
  @ApiOperation({ summary: 'Get waste reports' })
  getReports(@Query('collectionPointId') collectionPointId?: string) {
    return this.wasteService.getWasteReports(collectionPointId);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get waste statistics' })
  getStatistics() {
    return this.wasteService.getWasteStatistics();
  }

  @Put('reports/:id/status')
  @Roles(Role.ADMIN, Role.DRIVER)
  @ApiOperation({ summary: 'Update waste report status' })
  updateStatus(@Param('id') id: string, @Body() data: { status: string }) {
    return this.wasteService.updateWasteStatus(id, data.status);
  }

  @Delete('reports/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete waste report' })
  deleteReport(@Param('id') id: string) {
    return this.wasteService.deleteWasteReport(id);
  }
}