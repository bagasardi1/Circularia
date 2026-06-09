import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsGateway } from './gateway/notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async createNotification(
    userId: string,
    title: string,
    message: string,
    type: string,
  ) {
    const notification = await this.prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
      },
    });

    this.notificationsGateway.sendNotification(userId, notification);

    return notification;
  }

  async getUserNotifications(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async markAsRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }

  async notifyPickupAssigned(pickupId: string, driverId: string) {
    const pickup = await this.prisma.pickup.findUnique({
      where: { id: pickupId },
      include: {
        collectionPoint: true,
        driver: { include: { user: true } },
      },
    });

    if (!pickup || !pickup.driver) return;

    await this.createNotification(
      pickup.driver.userId,
      'Pickup Baru',
      `Anda mendapat pickup baru di ${pickup.collectionPoint.name}`,
      'INFO',
    );
  }

  async notifyPickupStatusUpdate(pickupId: string, status: string) {
    const pickup = await this.prisma.pickup.findUnique({
      where: { id: pickupId },
      include: {
        collectionPoint: { include: { user: true } },
        driver: { include: { user: true } },
      },
    });

    if (!pickup) return;

    await this.createNotification(
      pickup.collectionPoint.userId,
      'Status Pickup Update',
      `Pickup Anda sekarang berstatus: ${status}`,
      'SUCCESS',
    );

    this.notificationsGateway.sendTrackingUpdate(pickupId, {
      pickupId,
      status,
      timestamp: new Date(),
    });
  }

  async sendReminder(userId: string, message: string) {
    return this.createNotification(
      userId,
      'Reminder',
      message,
      'WARNING',
    );
  }
}