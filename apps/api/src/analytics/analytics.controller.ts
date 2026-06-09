import {
  Controller,
  Post,
  Get,
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
import { GamificationService } from './analytics.service';
import { Role } from '@prisma/client';

@ApiTags('gamification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Post('points')
  @ApiOperation({ summary: 'Add eco points to user' })
  addPoints(
    @Req() req,
    @Body() data: { points: number; reason: string },
  ) {
    return this.gamificationService.addEcoPoints(req.user.id, data.points, data.reason);
  }

  @Get('points')
  @ApiOperation({ summary: 'Get user eco points history' })
  getPoints(@Req() req) {
    return this.gamificationService.getUserEcoPoints(req.user.id);
  }

  @Get('leaderboard')
  @ApiOperation({ summary: 'Get driver leaderboard' })
  getLeaderboard() {
    return this.gamificationService.getLeaderboard(10);
  }

  @Get('rank')
  @ApiOperation({ summary: 'Get user rank' })
  getRank(@Req() req) {
    return this.gamificationService.getRank(req.user.id);
  }

  @Post('education')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create education content' })
  createContent(@Body() data: any) {
    return this.gamificationService.createEducationContent(data);
  }

  @Get('education')
  @ApiOperation({ summary: 'Get education contents' })
  getContents(@Query('category') category?: string) {
    return this.gamificationService.getEducationContents(category);
  }

  @Get('education/:id')
  @ApiOperation({ summary: 'Get education content details' })
  getContent(@Param('id') id: string) {
    return this.gamificationService.getEducationContent(id);
  }

  @Get('analytics')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get platform analytics' })
  getAnalytics() {
    return this.gamificationService.getAnalytics();
  }
}