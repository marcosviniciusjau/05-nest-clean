import { Either, left, right } from '@/core/either'
import { QuestionsRepos } from '../repos/question-repos'
import { NotFoundError } from './errors/not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'
interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}
type DeleteQuestionUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  null
>
export class DeleteQuestionUseCase {
  constructor(private questionsRepos: QuestionsRepos) {}
  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepos.findById(questionId)
    if (!question) {
      return left(new NotFoundError())
    }
    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }
    await this.questionsRepos.delete(question)
    return right(null)
  }
}
