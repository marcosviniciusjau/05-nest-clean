import { PaginationParams } from '@/core/repos/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

export abstract class AnswerCommentsRepos {
  abstract findByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>

  abstract findById(id: string): Promise<AnswerComment | null>
  abstract create(answerComment: AnswerComment): Promise<void>
  abstract delete(answerComment: AnswerComment): Promise<void>
}
