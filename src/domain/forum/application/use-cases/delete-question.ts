import { Either, left, right } from '@/core/either'
import { QuestionsRepos } from '../repos/question-repos'
import { NotFoundError } from '@/core/errors/errors/not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'
interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}
type DeleteQuestionUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  null
>
@Injectable()
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
