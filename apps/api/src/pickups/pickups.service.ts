import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PickupsService {
  constructor(private prisma: PrismaService) {}

  async createPickup(collectionPointId: string) {
    const collectionPoint = await this.prisma.collectionPoint.findUnique({
      where: { id: collectionPointId },
    });

    if (!collectionPoint) {
      throw new NotFoundException('Collection Point tidak ditemukan');
    }

    const pickup = await this.prisma.pickup.create({
      data: {
        collectionPointId,
        status: 'PENDING',
      },
    });

    return pickup;
  }

  async assignDriver(pickupId: string, driverId: string) {
    const pickup = await this.prisma.pickup.findUnique({
      where: { id: pickupId },
    });

    if (!pickup) {
      throw new NotFoundException('Pickup tidak ditemukan');
    }

    if (pickup.status !== 'PENDING') {
      throw new BadRequestException(
        'Pickup hanya bisa di-assign dari status PENDING',
      );
    }

    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
    });

    if (!driver) {
      throw new NotFoundException('Driver tidak ditemukan');
    }

    return await this.prisma.$transaction(async (tx) => {
      const updatedPickup = await tx.pickup.update({
        where: { id: pickupId },
        data: {
          driverId,
          status: 'ASSIGNED',
        },
      });

      await tx.pickupHistory.create({
        data: {
          pickupId,
          driverId,
          status: 'ASSIGNED',
        },
      });

      return updatedPickup;
    });
  }

  async updatePickupStatus(pickupId: string, status: string) {
    const validStatuses = [
      'PENDING',
      'ASSIGNED',
      'ON_THE_WAY',
      'COLLECTED',
      'COMPLETED',
    ];

    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Status ${status} tidak valid`);
    }

    const pickup = await this.prisma.pickup.findUnique({
      where: { id: pickupId },
      include: { driver: true },
    });

    if (!pickup) {
      throw new NotFoundException('Pickup tidak ditemukan');
    }

    return await this.prisma.$transaction(async (tx) => {
      const updatedPickup = await tx.pickup.update({
        where: { id: pickupId },
        data: { status },
      });

      if (pickup.driverId) {
        await tx.pickupHistory.create({
          data: {
            pickupId,
            driverId: pickup.driverId,
            status,
          },
        });
      }

      if (status === 'COMPLETED' && pickup.driverId) {
        await this.rewardDriver(pickup.driverId, tx);
      }

      return updatedPickup;
    });
  }

  async getPickupDetails(pickupId: string) {
    const pickup = await this.prisma.pickup.findUnique({
      where: { id: pickupId },
      include: {
        driver: {
          include: { user: true },
        },
        collectionPoint: true,
        history: true,
        tracking: true,
      },
    });

    if (!pickup) {
      throw new NotFoundException('Pickup tidak ditemukan');
    }

    return pickup;
  }

  private async rewardDriver(driverId: string, tx: any) {
    const leaderboard = await tx.leaderboard.findUnique({
      where: { driverId },
    });

    if (leaderboard) {
      await tx.leaderboard.update({
        where: { driverId },
        data: {
          totalPickups: { increment: 1 },
          points: { increment: 100 },
        },
      });
    } else {
      await tx.leaderboard.create({
        data: {
          driverId,
          totalPickups: 1,
          points: 100,
          rank: 0,
        },
      });
    }
  }
}