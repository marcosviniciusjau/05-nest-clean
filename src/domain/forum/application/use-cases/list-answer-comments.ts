import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepos } from '../repos/answer-comments-repos'
import { Injectable } from '@nestjs/common'
interface ListAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}
type ListAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>
@Injectable()
export class ListAnswerCommentsUseCase {
  constructor(private answerCommentsRepos: AnswerCommentsRepos) {}
  async execute({
    page,
    answerId,
  }: ListAnswerCommentsUseCaseRequest): Promise<ListAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepos.findByAnswerId(
      answerId,
      {
        page,
      },
    )
    return right({
      answerComments,
    })
  }
}
