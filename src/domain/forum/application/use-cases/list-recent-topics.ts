import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepos } from '../repos/question-repos'
import { Either, right } from '@/core/either'
interface ListRecentTopicsUseCaseRequest {
  page: number
}
type ListRecentTopicsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>
export class ListRecentTopicsUseCase {
  constructor(private questionsRepos: QuestionsRepos) {}
  async execute({
    page,
  }: ListRecentTopicsUseCaseRequest): Promise<ListRecentTopicsUseCaseResponse> {
    const questions = await this.questionsRepos.findRecent({ page })
    return right({
      questions,
    })
  }
}
