import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenSchema } from '@/infra/auth/jwt-strategy'

import { ChooseBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-best-answer'

@Controller('/answers/:answerId/choose-as-best')
export class ChooseBestAnswerController {
  constructor(private chooseBestAnswerUseCase: ChooseBestAnswerUseCase) {}
  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenSchema,
    @Param('answerId') answerId: string,
  ) {
    const userId = user.sub
    const result = await this.chooseBestAnswerUseCase.execute({
      authorId: userId,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
