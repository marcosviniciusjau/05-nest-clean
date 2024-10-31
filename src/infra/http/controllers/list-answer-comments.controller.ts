import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { z } from 'zod'
import { ListAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/list-answer-comments'
import { CommentPresenter } from '../presenter/comment-presenter'
const page = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidation = new ZodValidationPipe(page)
type PageQuerySchema = z.infer<typeof page>

@Controller('/answers/:answerId/comments')
export class ListAnswerCommentsController {
  constructor(private listAnswersComments: ListAnswerCommentsUseCase) {}
  @Get()
  async handle(
    @Query('page', queryValidation) page: PageQuerySchema,
    @Param('answerId') answerId: string,
  ) {
    const result = await this.listAnswersComments.execute({
      page,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const answerComments = result.value.answerComments
    return { comments: answerComments.map(CommentPresenter.toHttp) }
  }
}
