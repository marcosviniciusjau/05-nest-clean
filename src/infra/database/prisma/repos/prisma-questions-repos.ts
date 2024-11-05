import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionsRepos } from '@/domain/forum/repos/question-repos'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma-service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'
import { PaginationParams } from '@/core/repos/pagination-params'
import { QuestionAttachmentsRepos } from '@/domain/forum/application/repos/question-attachments-repos'
import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { PrismaQuestionDetailsMapper } from '../mappers/prisma-question-details-mapper'
import { DomainEvents } from '@/core/events/domain-events'
import { CacheRepos } from '@/infra/cache/cache-repos'

@Injectable()
export class PrismaQuestionsRepos implements QuestionsRepos {
  constructor(
    private prisma: PrismaService,
    private questionAttachmentsRepos: QuestionAttachmentsRepos,
    private cacheRepos: CacheRepos,
  ) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { id },
    })

    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: { slug },
    })

    if (!question) {
      return null
    }
    return PrismaQuestionMapper.toDomain(question)
  }

  async findDetailsBySlug(slug: string): Promise<QuestionDetails | null> {
    const cacheHit = await this.cacheRepos.get(`question:${slug}:details`)
    if (cacheHit) {
      const cacheData = JSON.parse(cacheHit)
      return PrismaQuestionDetailsMapper.toDomain(cacheData)
    }

    const question = await this.prisma.question.findUnique({
      where: { slug },
      include: {
        author: true,
        attachments: true,
      },
    })

    if (!question) {
      return null
    }

    await this.cacheRepos.set(
      `question:${slug}:details`,
      JSON.stringify(question),
    )

    const questionDetails = PrismaQuestionDetailsMapper.toDomain(question)

    return questionDetails
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.create({
      data,
    })
    await this.questionAttachmentsRepos.createMany(
      question.attachments.getNewItems(),
    )

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await Promise.all([
      this.prisma.question.update({
        where: {
          id: data.id,
        },
        data,
      }),

      this.questionAttachmentsRepos.createMany(
        question.attachments.getNewItems(),
      ),

      this.questionAttachmentsRepos.deleteMany(
        question.attachments.getRemovedItems(),
      ),

      this.cacheRepos.delete(`question:${data.slug}:details`),
    ])

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question)

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    })
  }
}
