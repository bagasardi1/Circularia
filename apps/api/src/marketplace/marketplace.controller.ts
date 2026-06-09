import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { MarketplaceService } from './marketplace.service';
import { Role } from '@prisma/client';

@ApiTags('marketplace')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post('products')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create new marketplace product' })
  createProduct(@Body() data: any) {
    return this.marketplaceService.createProduct(data);
  }

  @Get('products')
  @ApiOperation({ summary: 'Get all products' })
  getAllProducts() {
    return this.marketplaceService.getAllProducts();
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product details' })
  getProduct(@Param('id') id: string) {
    return this.marketplaceService.getProduct(id);
  }

  @Put('products/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update product' })
  updateProduct(@Param('id') id: string, @Body() data: any) {
    return this.marketplaceService.updateProduct(id, data);
  }

  @Delete('products/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete product' })
  deleteProduct(@Param('id') id: string) {
    return this.marketplaceService.deleteProduct(id);
  }

  @Post('orders')
  @ApiOperation({ summary: 'Create new order' })
  createOrder(@Req() req, @Body() data: { items: any[] }) {
    return this.marketplaceService.createOrder(req.user.id, data.items);
  }

  @Get('orders')
  @ApiOperation({ summary: 'Get user orders' })
  getOrders(@Req() req) {
    return this.marketplaceService.getOrders(req.user.id);
  }

  @Put('orders/:id/status')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update order status' })
  updateOrderStatus(@Param('id') id: string, @Body() data: { status: string }) {
    return this.marketplaceService.updateOrderStatus(id, data.status);
  }

  @Get('revenue')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get revenue statistics' })
  getRevenueStats() {
    return this.marketplaceService.getRevenueStats();
  }

  @Get('seller-data')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get seller data & top products' })
  getSellerData() {
    return this.marketplaceService.getSellerData();
  }
}