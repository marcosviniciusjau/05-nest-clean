import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepos } from '../repos/question-repos'
import { NotFoundError } from '@/core/errors/errors/not-found-error'
import { Either, left, right } from '@/core/either'
interface GetQuestionBySlugUseCaseRequest {
  slug: string
}
type GetQuestionBySlugUseCaseResponse = Either<
  NotFoundError,
  {
    question: Question
  }
>
export class GetQuestionBySlugUseCase {
  constructor(private questionsRepos: QuestionsRepos) {}
  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepos.findBySlug(slug)
    if (!question) {
      return left(new NotFoundError())
    }
    return right({
      question,
    })
  }
}
