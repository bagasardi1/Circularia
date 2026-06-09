import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WasteService {
  constructor(private prisma: PrismaService) {}

  async createWasteReport(collectionPointId: string, data: any) {
    const collectionPoint = await this.prisma.collectionPoint.findUnique({
      where: { id: collectionPointId },
    });

    if (!collectionPoint) {
      throw new NotFoundException('Collection Point tidak ditemukan');
    }

    return this.prisma.wasteReport.create({
      data: {
        collectionPointId,
        type: data.type,
        weight: data.weight,
        imageUrl: data.imageUrl,
        status: 'PENDING',
      },
    });
  }

  async getWasteReports(collectionPointId?: string) {
    return this.prisma.wasteReport.findMany({
      where: collectionPointId ? { collectionPointId } : {},
      include: {
        collectionPoint: {
          select: { name: true, address: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateWasteStatus(reportId: string, status: string) {
    return this.prisma.wasteReport.update({
      where: { id: reportId },
      data: { status },
    });
  }

  async getWasteStatistics() {
    const totalWaste = await this.prisma.wasteReport.aggregate({
      _sum: { weight: true },
      _count: { id: true },
    });

    const byType = await this.prisma.wasteReport.groupBy({
      by: ['type'],
      _sum: { weight: true },
      _count: { id: true },
    });

    return {
      totalWeight: totalWaste._sum.weight || 0,
      totalReports: totalWaste._count.id,
      byType: byType.map((item) => ({
        type: item.type,
        weight: item._sum.weight || 0,
        count: item._count.id,
      })),
    };
  }

  async deleteWasteReport(reportId: string) {
    return this.prisma.wasteReport.delete({
      where: { id: reportId },
    });
  }
}