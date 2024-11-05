import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'

import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenSchema } from '@/infra/auth/jwt-strategy'

@Controller('/notifications/:notificationId/read')
export class ReadNotificationController {
  constructor(private readNotifications: ReadNotificationUseCase) {}
  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenSchema,
    @Param('notificationId') notificationId: string,
  ) {
    const result = await this.readNotifications.execute({
      notificationId,
      recipientId: user.sub,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
