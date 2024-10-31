import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepos } from '../repos/answer-repos'
import { Injectable } from '@nestjs/common'
interface ListQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}
type ListQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>
@Injectable()
export class ListQuestionAnswersUseCase {
  constructor(private answersRepos: AnswersRepos) {}
  async execute({
    page,
    questionId,
  }: ListQuestionAnswersUseCaseRequest): Promise<ListQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepos.findByQuestionId(questionId, {
      page,
    })
    return right({
      answers,
    })
  }
}
