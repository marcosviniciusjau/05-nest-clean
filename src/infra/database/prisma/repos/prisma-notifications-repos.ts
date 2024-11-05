import { NotificationsRepos } from '@/domain/notification/application/repos/notifications-repos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma-service'
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

@Injectable()
export class PrismaNotificationsRepos implements NotificationsRepos {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notifications.findUnique({
      where: {
        id,
      },
    })
    if (!notification) {
      return null
    }
    return PrismaNotificationMapper.toDomain(notification)
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification)
    await this.prisma.notifications.create({
      data,
    })
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPrisma(notification)
    await this.prisma.notifications.update({
      where: {
        id: notification.id.toString(),
      },
      data,
    })
  }
}
