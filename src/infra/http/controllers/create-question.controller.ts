import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth-guard'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenSchema } from '@/infra/auth/jwt-strategy'

import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'

const createQuestionSchema = z.object({
  title: z.string(),
  content: z.string(),
})

const bodyValidation = new ZodValidationPipe(createQuestionSchema)
type CreateQuestionSchema = z.infer<typeof createQuestionSchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestionUseCase: CreateQuestionUseCase) {}
  @Post()
  async handle(
    @Body(bodyValidation)
    body: CreateQuestionSchema,
    @CurrentUser() user: TokenSchema,
  ) {
    const { title, content } = body
    const { sub: userId } = user
    await this.createQuestionUseCase.execute({
      authorId: userId,
      title,
      content,
      attachmentsIds: [],
    })
  }
}
