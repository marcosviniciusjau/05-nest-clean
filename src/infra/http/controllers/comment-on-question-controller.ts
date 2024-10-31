import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenSchema } from '@/infra/auth/jwt-strategy'

import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CommentQuestionUseCase } from '@/domain/forum/application/use-cases/comment-question'

const commentOnQuestionSchema = z.object({
  content: z.string(),
})

const bodyValidation = new ZodValidationPipe(commentOnQuestionSchema)
type CommentOnQuestionSchema = z.infer<typeof commentOnQuestionSchema>

@Controller('/questions/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private commentOnQuestionUseCase: CommentQuestionUseCase) {}
  @Post()
  async handle(
    @Body(bodyValidation)
    body: CommentOnQuestionSchema,
    @CurrentUser() user: TokenSchema,
    @Param('questionId') questionId: string,
  ) {
    const { content } = body
    const { sub: userId } = user
    const result = await this.commentOnQuestionUseCase.execute({
      authorId: userId,
      questionId,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
