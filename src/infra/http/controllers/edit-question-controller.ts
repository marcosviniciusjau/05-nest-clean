import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { TokenSchema } from '@/infra/auth/jwt-strategy'

import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'

const editQuestionSchema = z.object({
  title: z.string(),
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidation = new ZodValidationPipe(editQuestionSchema)
type EditQuestionSchema = z.infer<typeof editQuestionSchema>

@Controller('/questions/:id')
export class EditQuestionController {
  constructor(private editQuestionUseCase: EditQuestionUseCase) {}
  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidation)
    body: EditQuestionSchema,
    @CurrentUser() user: TokenSchema,
    @Param('id') questionId: string,
  ) {
    const { title, content, attachments } = body
    const userId = user.sub
    const result = await this.editQuestionUseCase.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: attachments,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
