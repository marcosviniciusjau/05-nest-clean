import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { z } from 'zod'
import { ListQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/list-question-answers'
const page = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidation = new ZodValidationPipe(page)
type PageQuerySchema = z.infer<typeof page>

@Controller('/questions/:questionId/answers')
export class ListQuestionAnswersController {
  constructor(private listQuestionsAnswers: ListQuestionAnswersUseCase) {}
  @Get()
  async handle(
    @Query('page', queryValidation) page: PageQuerySchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.listQuestionsAnswers.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const answers = result.value.answers
    return { answers }
  }
}
