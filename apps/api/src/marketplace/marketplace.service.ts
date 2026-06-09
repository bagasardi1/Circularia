import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MarketplaceService {
  constructor(private prisma: PrismaService) {}

  // CRUD Products
  async createProduct(data: any) {
    let product = await this.prisma.recycledProduct.findFirst({
      where: { name: data.name },
    });

    if (!product) {
      product = await this.prisma.recycledProduct.create({
        data: {
          name: data.name,
          description: data.description,
          category: data.category,
          imageUrl: data.imageUrl,
          environmentalImpact: data.environmentalImpact,
        },
      });
    }

    return this.prisma.marketplaceProduct.create({
      data: {
        productId: product.id,
        price: data.price,
        stock: data.stock,
      },
    });
  }

  async getAllProducts() {
    return this.prisma.marketplaceProduct.findMany({
      include: {
        product: true,
      },
      where: {
        stock: { gt: 0 },
      },
    });
  }

  async getProduct(id: string) {
    const product = await this.prisma.marketplaceProduct.findUnique({
      where: { id },
      include: {
        product: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Produk tidak ditemukan');
    }

    return product;
  }

  async updateProduct(id: string, data: any) {
    return this.prisma.marketplaceProduct.update({
      where: { id },
      data: {
        price: data.price,
        stock: data.stock,
      },
    });
  }

  async deleteProduct(id: string) {
    return this.prisma.marketplaceProduct.delete({
      where: { id },
    });
  }

  // Order Management
  async createOrder(userId: string, items: any[]) {
    for (const item of items) {
      const product = await this.prisma.marketplaceProduct.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(`Produk ${item.productId} tidak ditemukan`);
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Stock produk ${item.productId} tidak cukup`,
        );
      }
    }

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          status: 'PENDING',
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });

      for (const item of items) {
        await tx.marketplaceProduct.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }

      return order;
    });
  }

  async getOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateOrderStatus(orderId: string, status: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  // Revenue Calculation
  async getRevenueStats() {
    const totalRevenue = await this.prisma.order.aggregate({
      where: { status: { in: ['PAID', 'SHIPPED', 'COMPLETED'] } },
      _sum: { totalAmount: true },
      _count: { id: true },
    });

    const byMonth = await this.prisma.$queryRaw`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        SUM(total_amount) as revenue,
        COUNT(*) as orders
      FROM orders
      WHERE status IN ('PAID', 'SHIPPED', 'COMPLETED')
      GROUP BY month
      ORDER BY month DESC
      LIMIT 12
    `;

    return {
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      totalOrders: totalRevenue._count.id,
      revenueByMonth: byMonth,
    };
  }

  async getSellerData() {
    const topProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, price: true },
      _count: { id: true },
      orderBy: {
        _sum: { quantity: 'desc' },
      },
      take: 10,
    });

    return topProducts;
  }
}