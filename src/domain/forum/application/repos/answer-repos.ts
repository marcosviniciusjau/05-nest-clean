import { PaginationParams } from '@/core/repos/pagination-params'
import { Answer } from '../../enterprise/entities/answer'
export interface AnswersRepos {
  findByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]>
  findById(id: string): Promise<Answer | null>
  create(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
  save(question: Answer): Promise<void>
}
