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
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CollectionPointsService } from './collection-points.service';
import { Role } from '@prisma/client';

@ApiTags('collection-points')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('collection-points')
export class CollectionPointsController {
  constructor(
    private readonly collectionPointsService: CollectionPointsService,
  ) {}

  @Post()
  @Roles(Role.COLLECTION_POINT)
  @ApiOperation({ summary: 'Create collection point' })
  create(@Req() req, @Body() data: any) {
    return this.collectionPointsService.create(req.user.id, data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all collection points' })
  findAll() {
    return this.collectionPointsService.findAll();
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Get nearby collection points' })
  getNearby(@Query('latitude') lat: number, @Query('longitude') lng: number) {
    return this.collectionPointsService.getNearbyPoints(lat, lng, 5);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get collection point details' })
  findOne(@Param('id') id: string) {
    return this.collectionPointsService.findOne(id);
  }

  @Get(':id/capacity')
  @ApiOperation({ summary: 'Get collection point capacity & waste volume' })
  getCapacity(@Param('id') id: string) {
    return this.collectionPointsService.getCapacity(id);
  }

  @Put(':id')
  @Roles(Role.COLLECTION_POINT, Role.ADMIN)
  @ApiOperation({ summary: 'Update collection point' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.collectionPointsService.update(id, data);
  }

  @Delete(':id')
  @Roles(Role.COLLECTION_POINT, Role.ADMIN)
  @ApiOperation({ summary: 'Delete collection point' })
  delete(@Param('id') id: string) {
    return this.collectionPointsService.delete(id);
  }

  @Get('volume/aggregate')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get aggregate waste volume by type' })
  getAggregateVolume() {
    return this.collectionPointsService.aggregateVolume();
  }
}