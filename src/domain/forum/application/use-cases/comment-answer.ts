import { AnswersRepos } from '../repos/answer-repos'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepos } from '../repos/answer-comment-repos'
import { Either, left, right } from '@/core/either'
import { NotFoundError } from '@/core/errors/errors/not-found-error'
interface CommentAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentAnswerUseCaseResponse = Either<
  NotFoundError,
  {
    answerComment: AnswerComment
  }
>
export class CommentAnswerUseCase {
  constructor(
    private answersRepos: AnswersRepos,
    private answerCommentRepos: AnswerCommentsRepos,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentAnswerUseCaseRequest): Promise<CommentAnswerUseCaseResponse> {
    const answer = await this.answersRepos.findById(answerId)
    if (!answer) {
      return left(new NotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content,
    })

    await this.answerCommentRepos.create(answerComment)
    return right({
      answerComment,
    })
  }
}
