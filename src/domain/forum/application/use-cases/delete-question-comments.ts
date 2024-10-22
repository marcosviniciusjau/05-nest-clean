import { Either, left, right } from '@/core/either'
import { QuestionCommentsRepos } from '../repos/question-comment-repos'
import { NotAllowedError } from './errors/not-allowed-error'
import { NotFoundError } from './errors/not-found-error'

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  NotAllowedError | NotFoundError,
  object
>
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
