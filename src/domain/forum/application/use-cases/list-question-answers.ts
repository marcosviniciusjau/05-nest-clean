import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'
import { AnswerCommentsRepos } from '../repos/answer-comments-repos'
interface ListQuestionAnswersUseCaseRequest {
  answerId: string
  page: number
}
type ListQuestionAnswersUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>
@Injectable()
export class ListQuestionAnswersUseCase {
  constructor(private answersRepos: AnswerCommentsRepos) {}
  async execute({
    page,
    answerId,
  }: ListQuestionAnswersUseCaseRequest): Promise<ListQuestionAnswersUseCaseResponse> {
    const comments = await this.answersRepos.findByAnswerIdWithAuthor(
      answerId,
      {
        page,
      },
    )
    return right({
      comments,
    })
  }
}
