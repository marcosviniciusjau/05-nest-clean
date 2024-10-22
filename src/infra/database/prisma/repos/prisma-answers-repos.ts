import { PaginationParams } from '@/core/repos/pagination-params'
import { AnswersRepos } from '@/domain/forum/application/repos/answer-repos'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerRepos implements AnswersRepos {
  findByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Answer | null> {
    throw new Error('Method not implemented.')
  }

  create(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(question: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
