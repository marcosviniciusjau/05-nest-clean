import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepos } from '../repos/question-comment-repos'
import { Injectable } from '@nestjs/common'
interface ListQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}
type ListQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>
@Injectable()
export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepos: QuestionCommentsRepos) {}
  async execute({
    page,
    questionId,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentsRepos.findByQuestionId(
      questionId,
      {
        page,
      },
    )
    return right({
      questionComments,
    })
  }
}
