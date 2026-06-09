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
import { EducationService } from './education.service';
import { Role } from '@prisma/client';

@ApiTags('education')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create education content' })
  create(@Body() data: any) {
    return this.educationService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Get all education contents' })
  findAll(@Query('category') category?: string, @Query('level') level?: string) {
    return this.educationService.findAll(category, level);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get education content detail' })
  findOne(@Param('id') id: string) {
    return this.educationService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update education content' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.educationService.update(id, data);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete education content' })
  delete(@Param('id') id: string) {
    return this.educationService.delete(id);
  }
}