import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DriversService {
  constructor(private prisma: PrismaService) {}

  async getProfile(driverId: string) {
    const driver = await this.prisma.driver.findUnique({
      where: { id: driverId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phoneNumber: true,
            address: true,
            avatar: true,
          },
        },
        leaderboard: true,
      },
    });

    if (!driver) {
      throw new NotFoundException('Driver tidak ditemukan');
    }

    return driver;
  }

  async updateStatus(driverId: string, status: string) {
    const driver = await this.prisma.driver.update({
      where: { id: driverId },
      data: { status },
    });

    return driver;
  }

  async updateLocation(driverId: string, lat: number, lng: number) {
    const driver = await this.prisma.driver.update({
      where: { id: driverId },
      data: {
        currentLat: lat,
        currentLng: lng,
      },
    });

    return driver;
  }

  async getLeaderboard(limit = 10) {
    return this.prisma.leaderboard.findMany({
      take: limit,
      orderBy: [{ points: 'desc' }, { totalPickups: 'desc' }],
      include: {
        driver: {
          include: {
            user: {
              select: { name: true, avatar: true },
            },
          },
        },
      },
    });
  }

  async getDriverStats(driverId: string) {
    const leaderboard = await this.prisma.leaderboard.findUnique({
      where: { driverId },
    });

    if (!leaderboard) {
      throw new NotFoundException('Driver stats tidak ditemukan');
    }

    const pickups = await this.prisma.pickup.count({
      where: { driverId, status: 'COMPLETED' },
    });

    return {
      rank: leaderboard.rank,
      points: leaderboard.points,
      totalPickups: leaderboard.totalPickups,
      completedPickups: pickups,
    };
  }
}