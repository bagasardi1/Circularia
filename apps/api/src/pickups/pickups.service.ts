import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PickupsService {
  constructor(private prisma: PrismaService) {}

  async createPickup(userId: string, data: { collectionPointId?: string, address?: string, scheduledAt?: string }) {
    let cpId = data.collectionPointId;

    if (!cpId) {
      let collectionPoint = await this.prisma.collectionPoint.findUnique({
        where: { userId },
      });

      if (!collectionPoint) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        collectionPoint = await this.prisma.collectionPoint.create({
          data: {
            userId,
            name: `Lokasi Pickup ${user?.name || 'User'}`,
            address: data.address || user?.address || 'Alamat belum diatur',
            latitude: -6.2,
            longitude: 106.8,
            capacity: 100,
          },
        });
      } else if (data.address && data.address !== collectionPoint.address) {
        collectionPoint = await this.prisma.collectionPoint.update({
          where: { id: collectionPoint.id },
          data: { address: data.address }
        });
      }
      cpId = collectionPoint.id;
    }

    const pickup = await this.prisma.pickup.create({
      data: {
        collectionPointId: cpId,
        status: 'PENDING',
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : undefined,
      },
    });

    return pickup;
  }

  async getMyPickups(userId: string, role: string) {
    if (role === 'ADMIN') {
      return this.prisma.pickup.findMany({
        orderBy: { createdAt: 'desc' },
        include: { collectionPoint: true, driver: { include: { user: true } } }
      });
    } else if (role === 'DRIVER') {
      const driver = await this.prisma.driver.findUnique({ where: { userId } });
      if (!driver) return [];
      return this.prisma.pickup.findMany({
        where: { driverId: driver.id },
        orderBy: { createdAt: 'desc' },
        include: { collectionPoint: true, driver: { include: { user: true } } }
      });
    } else {
      return this.prisma.pickup.findMany({
        where: {
          collectionPoint: {
            userId: userId
          }
        },
        orderBy: { createdAt: 'desc' },
        include: { collectionPoint: true, driver: { include: { user: true } } }
      });
    }
  }

  async getAvailablePickups() {
    return this.prisma.pickup.findMany({
      where: { status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      include: { collectionPoint: { include: { user: true } } }
    });
  }

  async getDriverStats(userId: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { userId },
      include: { leaderboard: true }
    });

    if (!driver) {
      throw new NotFoundException('Driver tidak ditemukan');
    }

    const myPickups = await this.prisma.pickup.findMany({
      where: { driverId: driver.id }
    });

    const totalCompleted = myPickups.filter(p => p.status === 'COMPLETED').length;
    const points = driver.leaderboard?.points || 0;
    const earned = totalCompleted * 45000; // Rp 45.000 per pickup selesai (seperti di UI)

    return {
      totalPickups: myPickups.length,
      totalCompleted,
      points,
      earned,
      rank: driver.leaderboard?.rank || 12,
      efficiency: '92%'
    };
  }

  async assignDriver(pickupId: string, driverId: string | null, loggedInUserId: string) {
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

    let finalDriverId = driverId;

    if (!finalDriverId) {
      const driver = await this.prisma.driver.findUnique({
        where: { userId: loggedInUserId },
      });
      if (!driver) {
        throw new NotFoundException('Driver Profile tidak ditemukan');
      }
      finalDriverId = driver.id;
    }

    return await this.prisma.$transaction(async (tx) => {
      const updatedPickup = await tx.pickup.update({
        where: { id: pickupId },
        data: {
          driverId: finalDriverId,
          status: 'ASSIGNED',
        },
      });

      await tx.pickupHistory.create({
        data: {
          pickupId,
          driverId: finalDriverId!,
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
          rank: 12,
        },
      });
    }
  }
}
