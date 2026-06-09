import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
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

  async findAll(category?: string, level?: string) {
    return this.prisma.educationContent.findMany({
      where: {
        ...(category && { category }),
        ...(level && { level }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const content = await this.prisma.educationContent.findUnique({
      where: { id },
    });

    if (!content) {
      throw new NotFoundException('Content tidak ditemukan');
    }

    return content;
  }

  async update(id: string, data: any) {
    return this.prisma.educationContent.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.educationContent.delete({
      where: { id },
    });
  }
}