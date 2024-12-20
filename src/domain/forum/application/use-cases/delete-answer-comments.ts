import { Either, left, right } from '@/core/either'
import { AnswerCommentsRepos } from '../repos/answer-comments-repos'
import { NotFoundError } from '@/core/errors/errors/not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  object
>
@Injectable()
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
