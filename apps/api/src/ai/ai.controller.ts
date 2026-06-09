import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AiService } from './ai.service';

@ApiTags('ai')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('classify')
  @ApiOperation({ summary: 'Classify waste from image' })
  classifyWaste(
    @Body() data: { imageUrl: string; wasteType: string },
  ) {
    return this.aiService.classifyWasteImage(data.imageUrl, data.wasteType);
  }

  @Post('recommendation')
  @ApiOperation({ summary: 'Get waste conversion recommendation' })
  getRecommendation(@Body() data: { wasteType: string }) {
    return this.aiService.getWasteRecommendation(data.wasteType);
  }

  @Post('economic-estimate')
  @ApiOperation({ summary: 'Estimate economic value of waste' })
  estimateEconomic(
    @Body() data: { wasteType: string; weight: number },
  ) {
    return this.aiService.estimateEconomicValue(data.wasteType, data.weight);
  }

  @Post('environmental-impact')
  @ApiOperation({ summary: 'Estimate environmental impact' })
  estimateImpact(
    @Body() data: { wasteType: string; weight: number },
  ) {
    return this.aiService.estimateEnvironmentalImpact(data.wasteType, data.weight);
  }

  @Post('simulation')
  @ApiOperation({ summary: 'Generate AI simulation with insights' })
  generateSimulation(
    @Req() req,
    @Body() data: { wasteType: string; quantity: number; imageUrl?: string },
  ) {
    return this.aiService.generateAiSimulation(req.user.id, data);
  }
}