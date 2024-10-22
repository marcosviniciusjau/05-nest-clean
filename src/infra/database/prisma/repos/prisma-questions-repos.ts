import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepos } from '@/domain/forum/repos/question-repos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma-service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionsRepos implements QuestionsRepos {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
    })

    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }

  create(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
