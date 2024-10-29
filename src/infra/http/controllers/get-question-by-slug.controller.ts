import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { QuestionPresenter } from '../presenter/question-presenter'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'

@Controller('/questions/:slug')
export class GetQuestionBySlugController {
  constructor(private getQuestionBySlugs: GetQuestionBySlugUseCase) {}
  @Get()
  async handle(@Param('page') slug: string) {
    const result = await this.getQuestionBySlugs.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return {
      questions: QuestionPresenter.toHttp(result.value.question),
    }
  }
}
