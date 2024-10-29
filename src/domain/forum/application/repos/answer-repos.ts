import { PaginationParams } from '@/core/repos/pagination-params'
import { Answer } from '../../enterprise/entities/answer'
export abstract class AnswersRepos {
  abstract findByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>

  abstract findById(id: string): Promise<Answer | null>
  abstract create(answer: Answer): Promise<void>
  abstract delete(answer: Answer): Promise<void>
  abstract save(question: Answer): Promise<void>
}
