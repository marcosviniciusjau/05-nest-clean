import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenSchema } from '@/infra/auth/jwt-strategy'

import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comments'

@Controller('/answers/comments/:id')
export class DeleteQuestionCommentController {
  constructor(
    private deleteQuestionCommentUseCase: DeleteQuestionCommentUseCase,
  ) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: TokenSchema,
    @Param('id') questionCommentId: string,
  ) {
    const userId = user.sub
    const result = await this.deleteQuestionCommentUseCase.execute({
      authorId: userId,
      questionCommentId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
