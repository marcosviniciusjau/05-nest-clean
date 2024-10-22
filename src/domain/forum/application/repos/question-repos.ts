import { PaginationParams } from '@/core/repos/pagination-params'
import { Question } from '@/domain/forum/enterprise/entities/question'

export interface QuestionsRepos {
  findById(id: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  findRecent(params: PaginationParams): Promise<Question[]>
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
}
