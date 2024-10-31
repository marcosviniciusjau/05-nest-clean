import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenSchema } from '@/infra/auth/jwt-strategy'

import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comments'

@Controller('/answers/comments/:id')
export class DeleteAnswerCommentController {
  constructor(private deleteAnswerCommentUseCase: DeleteAnswerCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenSchema,
    @Param('id') answerCommentId: string,
  ) {
    const userId = user.sub
    const result = await this.deleteAnswerCommentUseCase.execute({
      authorId: userId,
      answerCommentId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
