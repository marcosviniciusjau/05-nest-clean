import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { z } from 'zod'
import { ListQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/list-question-comments'

import { CommentWithAuthorPresenter } from '../presenter/comment-with-author-presenter'

const page = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidation = new ZodValidationPipe(page)
type PageQuerySchema = z.infer<typeof page>

@Controller('/questions/:questionId/comments')
export class ListQuestionCommentsController {
  constructor(private listQuestionsComments: ListQuestionCommentsUseCase) {}
  @Get()
  async handle(
    @Query('page', queryValidation) page: PageQuerySchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.listQuestionsComments.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const comments = result.value.comments
    return { comments: comments.map(CommentWithAuthorPresenter.toHttp) }
  }
}
