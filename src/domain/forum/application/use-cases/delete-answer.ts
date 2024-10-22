import { Either, left, right } from '@/core/either'
import { AnswersRepos } from '../repos/answer-repos'
import { NotFoundError } from './errors/not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'
interface DeleteAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  object
>
export class DeleteAnswerUseCase {
  constructor(private answerRepos: AnswersRepos) {}
  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepos.findById(answerId)
    if (!answer) {
      return left(new NotFoundError())
    }
    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }
    await this.answerRepos.delete(answer)
    return right({})
  }
}
