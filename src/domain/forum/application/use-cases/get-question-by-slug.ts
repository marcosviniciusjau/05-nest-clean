import { QuestionsRepos } from '../repos/question-repos'
import { NotFoundError } from '@/core/errors/errors/not-found-error'
import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details'
interface GetQuestionBySlugUseCaseRequest {
  slug: string
}
type GetQuestionBySlugUseCaseResponse = Either<
  NotFoundError,
  {
    question: QuestionDetails
  }
>
@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepos: QuestionsRepos) {}
  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepos.findDetailsBySlug(slug)
    if (!question) {
      return left(new NotFoundError())
    }
    return right({
      question,
    })
  }
}
