import { PaginationParams } from '@/core/repos/pagination-params'
import { Question } from '@/domain/forum/enterprise/entities/question'

export interface QuestionsRepos {
  findById(id: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
  save(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
