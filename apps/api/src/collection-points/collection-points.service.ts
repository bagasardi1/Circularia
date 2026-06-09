import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CollectionPointsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    const existingPoint = await this.prisma.collectionPoint.findUnique({
      where: { userId },
    });

    if (existingPoint) {
      throw new BadRequestException(
        'User sudah memiliki collection point',
      );
    }

    return this.prisma.collectionPoint.create({
      data: {
        userId,
        name: data.name,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        capacity: data.capacity || 100,
        wasteType: data.wasteType,
      },
    });
  }

  async update(id: string, data: any) {
    const collectionPoint = await this.prisma.collectionPoint.findUnique({
      where: { id },
    });

    if (!collectionPoint) {
      throw new NotFoundException('Collection Point tidak ditemukan');
    }

    return this.prisma.collectionPoint.update({
      where: { id },
      data,
    });
  }

  async findAll() {
    return this.prisma.collectionPoint.findMany({
      include: {
        user: {
          select: { name: true, email: true, phoneNumber: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const collectionPoint = await this.prisma.collectionPoint.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true, email: true, phoneNumber: true },
        },
        reports: true,
      },
    });

    if (!collectionPoint) {
      throw new NotFoundException('Collection Point tidak ditemukan');
    }

    return collectionPoint;
  }

  async delete(id: string) {
    return this.prisma.collectionPoint.delete({
      where: { id },
    });
  }

  async getCapacity(id: string) {
    const collectionPoint = await this.findOne(id);

    const wasteReports = await this.prisma.wasteReport.findMany({
      where: { collectionPointId: id, status: 'PENDING' },
    });

    const totalWeight = wasteReports.reduce(
      (sum, report) => sum + report.weight,
      0,
    );

    const capacityUsed = (totalWeight / collectionPoint.capacity) * 100;

    return {
      totalCapacity: collectionPoint.capacity,
      usedCapacity: totalWeight,
      capacityPercentage: Math.min(capacityUsed, 100),
      wasteItems: wasteReports.length,
      isFull: capacityUsed >= 100,
    };
  }

  async aggregateVolume() {
    const aggregation = await this.prisma.wasteReport.groupBy({
      by: ['type', 'collectionPointId'],
      _sum: {
        weight: true,
      },
    });

    return aggregation.map((item) => ({
      collectionPointId: item.collectionPointId,
      wasteType: item.type,
      totalWeight: item._sum.weight || 0,
    }));
  }

  async getNearbyPoints(latitude: number, longitude: number, radiusKm = 5) {
    const allPoints = await this.prisma.collectionPoint.findMany();

    return allPoints
      .map((point) => ({
        ...point,
        distance: this.calculateDistance(
          latitude,
          longitude,
          point.latitude,
          point.longitude,
        ),
      }))
      .filter((point) => point.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance);
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}