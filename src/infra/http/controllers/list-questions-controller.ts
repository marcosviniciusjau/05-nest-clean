import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { z } from 'zod'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions'
import { QuestionPresenter } from '../presenter/question-presenter'
const page = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidation = new ZodValidationPipe(page)
type PageQuerySchema = z.infer<typeof page>

@Controller('/questions')
export class ListQuestionController {
  constructor(private listQuestions: ListRecentQuestionsUseCase) {}
  @Get()
  async handle(@Query('page', queryValidation) page: PageQuerySchema) {
    const result = await this.listQuestions.execute({
      page,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const questions = result.value.questions
    return {
      questions: questions.map(QuestionPresenter.toHttp),
    }
  }
}
