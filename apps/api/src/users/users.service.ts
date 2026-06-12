import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        driver: true,
        collectionPoint: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Ambil total point (misalnya menjumlahkan dari history, tapi untuk simplicity kita ambil dari agregat ecoPoints)
    const pointsData = await this.prisma.ecoPoint.aggregate({
      where: { userId: id },
      _sum: { points: true }
    });

    const totalPoints = pointsData._sum.points || 0;

    const { password, ...result } = user;
    return { ...result, points: totalPoints };
  }

  async update(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async getEcoPoints(userId: string) {
    return this.prisma.ecoPoint.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5 // Ambil 5 terbaru untuk aktivitas
    });
  }
}
