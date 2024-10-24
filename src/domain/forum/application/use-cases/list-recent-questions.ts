import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepos } from '../repos/question-repos'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

interface ListRecentQuestionsUseCaseRequest {
  page: number
}

type ListRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

@Injectable()
export class ListRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepos) {}

  async execute({
    page,
  }: ListRecentQuestionsUseCaseRequest): Promise<ListRecentQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ page })

    return right({
      questions,
    })
  }
}
