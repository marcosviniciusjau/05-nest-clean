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
import { CommentAnswerUseCase } from '@/domain/forum/application/use-cases/comment-answer'

const commentOnAnswerSchema = z.object({
  content: z.string(),
})

const bodyValidation = new ZodValidationPipe(commentOnAnswerSchema)
type CommentOnAnswerSchema = z.infer<typeof commentOnAnswerSchema>

@Controller('/answers/:answerId/comments')
export class CommentOnAnswerController {
  constructor(private commentOnAnswerUseCase: CommentAnswerUseCase) {}
  @Post()
  async handle(
    @Body(bodyValidation)
    body: CommentOnAnswerSchema,
    @CurrentUser() user: TokenSchema,
    @Param('answerId') answerId: string,
  ) {
    const { content } = body
    const { sub: userId } = user
    const result = await this.commentOnAnswerUseCase.execute({
      authorId: userId,
      answerId,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
