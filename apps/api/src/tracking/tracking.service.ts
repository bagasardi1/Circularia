import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrackingService {
  constructor(private prisma: PrismaService) {}

  async createTrackingEntry(pickupId: string, data: any) {
    const pickup = await this.prisma.pickup.findUnique({
      where: { id: pickupId },
    });

    if (!pickup) {
      throw new NotFoundException('Pickup tidak ditemukan');
    }

    return this.prisma.wasteTracking.create({
      data: {
        pickupId,
        stage: data.stage,
        location: data.location,
        description: data.description,
      },
    });
  }

  async getTimeline(pickupId: string) {
    const pickup = await this.prisma.pickup.findUnique({
      where: { id: pickupId },
    });

    if (!pickup) {
      throw new NotFoundException('Pickup tidak ditemukan');
    }

    return this.prisma.wasteTracking.findMany({
      where: { pickupId },
      orderBy: { timestamp: 'asc' },
    });
  }

  async updateWastePosition(pickupId: string, stage: string, location: string) {
    const tracking = await this.prisma.wasteTracking.create({
      data: {
        pickupId,
        stage,
        location,
        description: `Limbah dipindahkan ke: ${stage}`,
      },
    });

    return tracking;
  }

  async getTrackingHistory(pickupId: string) {
    const tracking = await this.prisma.wasteTracking.findMany({
      where: { pickupId },
      orderBy: { timestamp: 'desc' },
      include: {
        pickup: true,
      },
    });

    return tracking.map((item) => ({
      id: item.id,
      stage: item.stage,
      location: item.location,
      description: item.description,
      timestamp: item.timestamp,
      duration: this.calculateDuration(tracking, item),
    }));
  }

  async getTrackingStats(pickupId: string) {
    const tracking = await this.prisma.wasteTracking.findMany({
      where: { pickupId },
      orderBy: { timestamp: 'asc' },
    });

    if (tracking.length === 0) {
      return {
        totalStages: 0,
        totalDuration: 0,
        stages: [],
      };
    }

    const stages = [
      ...new Set(tracking.map((t) => t.stage)),
    ];

    const firstTimestamp = tracking[0].timestamp;
    const lastTimestamp = tracking[tracking.length - 1].timestamp;
    const totalDuration =
      (lastTimestamp.getTime() - firstTimestamp.getTime()) / 1000 / 60;

    return {
      totalStages: stages.length,
      totalDuration,
      stages,
      firstUpdate: firstTimestamp,
      lastUpdate: lastTimestamp,
    };
  }

  private calculateDuration(
    allTracking: any[],
    currentItem: any,
  ): number {
    const currentIndex = allTracking.findIndex((t) => t.id === currentItem.id);
    if (currentIndex === 0) return 0;

    const prevItem = allTracking[currentIndex - 1];
    const duration =
      (currentItem.timestamp.getTime() - prevItem.timestamp.getTime()) /
      1000 /
      60;

    return Math.round(duration);
  }
}