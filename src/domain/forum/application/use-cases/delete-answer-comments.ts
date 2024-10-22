import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepos } from '../repos/answer-comment-repos'
import { NotFoundError } from './errors/not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  object
>
export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentRepos: AnswerCommentsRepos) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepos.findById(answerCommentId)

    if (!answerComment) {
      return left(new NotFoundError())
    }
    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentRepos.delete(answerComment)
    return right({})
  }
}
