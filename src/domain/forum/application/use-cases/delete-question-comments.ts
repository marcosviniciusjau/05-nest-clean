import { Either, left, right } from '@/core/either'
import { QuestionCommentsRepos } from '../repos/question-comments-repos'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { NotFoundError } from '@/core/errors/errors/not-found-error'
import { Injectable } from '@nestjs/common'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  NotAllowedError | NotFoundError,
  object
>
@Injectable()
export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepos: QuestionCommentsRepos) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepos.findById(questionCommentId)

    if (!questionComment) {
      return left(new NotFoundError())
    }
    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.questionCommentRepos.delete(questionComment)
    return right({})
  }
}
