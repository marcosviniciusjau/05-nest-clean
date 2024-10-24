import { PaginationParams } from '@/core/repos/pagination-params'
import { Question } from '@/domain/forum/enterprise/entities/question'

export abstract class QuestionsRepos {
  abstract findById(id: string): Promise<Question | null>
  abstract findBySlug(slug: string): Promise<Question | null>
  abstract findManyRecent(params: PaginationParams): Promise<Question[]>
  abstract create(question: Question): Promise<void>
  abstract delete(question: Question): Promise<void>
  abstract save(question: Question): Promise<void>
}
