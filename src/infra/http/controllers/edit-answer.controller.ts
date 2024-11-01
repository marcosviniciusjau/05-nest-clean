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
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'

const editAnswerSchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()),
})

const bodyValidation = new ZodValidationPipe(editAnswerSchema)
type EditAnswerSchema = z.infer<typeof editAnswerSchema>

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswerUseCase: EditAnswerUseCase) {}
  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidation)
    body: EditAnswerSchema,
    @CurrentUser() user: TokenSchema,
    @Param('id') answerId: string,
  ) {
    const { content, attachments } = body
    const userId = user.sub
    const result = await this.editAnswerUseCase.execute({
      content,
      answerId,
      authorId: userId,
      attachmentsIds: attachments,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
