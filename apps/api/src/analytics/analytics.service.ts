import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  async addEcoPoints(userId: string, points: number, reason: string) {
    return this.prisma.ecoPoint.create({
      data: {
        userId,
        points,
        reason,
      },
    });
  }

  async getUserEcoPoints(userId: string) {
    const userPoints = await this.prisma.ecoPoint.aggregate({
      where: { userId },
      _sum: { points: true },
    });

    const history = await this.prisma.ecoPoint.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return {
      totalPoints: userPoints._sum.points || 0,
      history,
    };
  }

  async getLeaderboard(limit = 10) {
    return this.prisma.leaderboard.findMany({
      take: limit,
      orderBy: { points: 'desc' },
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

  async updateLeaderboard(driverId: string) {
    const leaderboard = await this.prisma.leaderboard.findUnique({
      where: { driverId },
    });

    if (!leaderboard) {
      return this.prisma.leaderboard.create({
        data: {
          driverId,
          rank: 0,
          totalPickups: 0,
          points: 100,
        },
      });
    }

    return this.prisma.leaderboard.update({
      where: { driverId },
      data: { points: leaderboard.points + 100 },
    });
  }

  async getRank(userId: string) {
    const allLeaderboard = await this.prisma.leaderboard.findMany({
      orderBy: { points: 'desc' },
      select: { driverId: true, points: true },
    });

    const ranked = allLeaderboard.map((entry, index) => ({
      driverId: entry.driverId,
      points: entry.points,
      rank: index + 1,
    }));

    const userRank = ranked.find((r) => r.driverId === userId);
    return userRank || { rank: 0, points: 0 };
  }

  async createEducationContent(data: any) {
    return this.prisma.educationContent.create({
      data: {
        title: data.title,
        content: data.content,
        category: data.category,
        level: data.level || 'BEGINNER',
        thumbnailUrl: data.thumbnailUrl,
      },
    });
  }

  async getEducationContents(category?: string) {
    return this.prisma.educationContent.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: 'desc' },
    });
  }

  async getEducationContent(id: string) {
    const content = await this.prisma.educationContent.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException('Content tidak ditemukan');
    }

    return content;
  }

  async getAnalytics() {
    const pickups = await this.prisma.pickup.aggregate({
      _count: { id: true },
    });

    const users = await this.prisma.user.aggregate({
      _count: { id: true },
    });

    const ecoPoints = await this.prisma.ecoPoint.aggregate({
      _sum: { points: true },
    });

    const orders = await this.prisma.order.aggregate({
      where: { status: { in: ['PAID', 'SHIPPED', 'COMPLETED'] } },
      _sum: { totalAmount: true },
    });

    return {
      totalPickups: pickups._count.id,
      totalUsers: users._count.id,
      totalEcoPoints: ecoPoints._sum.points || 0,
      totalRevenue: orders._sum.totalAmount || 0,
    };
  }
}