import { PaginationParams } from '@/core/repos/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export abstract class QuestionCommentsRepos {
  abstract findByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>

  abstract findById(id: string): Promise<QuestionComment | null>
  abstract create(questionComment: QuestionComment): Promise<void>
  abstract delete(questionComment: QuestionComment): Promise<void>
}
