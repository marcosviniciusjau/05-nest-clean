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
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'

const answerQuestionSchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidation = new ZodValidationPipe(answerQuestionSchema)
type AnswerQuestionSchema = z.infer<typeof answerQuestionSchema>

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestionUseCase: AnswerQuestionUseCase) {}
  @Post()
  async handle(
    @Body(bodyValidation)
    body: AnswerQuestionSchema,
    @CurrentUser() user: TokenSchema,
    @Param('questionId') questionId: string,
  ) {
    const { content, attachments } = body
    const { sub: userId } = user
    const result = await this.answerQuestionUseCase.execute({
      authorId: userId,
      questionId,
      attachmentsIds: attachments,
      content,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
