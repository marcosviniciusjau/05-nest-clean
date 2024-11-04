import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { QuestionDetailsPresenter } from '../presenter/question-details-presenter'

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
      questions: QuestionDetailsPresenter.toHttp(result.value.question),
    }
  }
}
