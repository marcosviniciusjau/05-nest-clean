import { PaginationParams } from '@/core/repos/pagination-params'
import { AnswersRepos } from '@/domain/forum/application/repos/answer-repos'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma-service'
import { PrismaAnswerMapper } from '../mappers/prisma-answer-mapper'
import { AnswerAttachmentsRepos } from '@/domain/forum/application/repos/answer-attachment-repos'
import { DomainEvents } from '@/core/events/domain-events'
@Injectable()
export class PrismaAnswersRepos implements AnswersRepos {
  constructor(
    private prisma: PrismaService,
    private answerAttachmentsRepos: AnswerAttachmentsRepos,
  ) {}

  async findByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = await this.prisma.answer.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answers.map(PrismaAnswerMapper.toDomain)
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: { id },
    })

    if (!answer) {
      return null
    }
    return PrismaAnswerMapper.toDomain(answer)
  }

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await this.prisma.answer.create({
      data,
    })

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(answer: Answer): Promise<void> {
    await this.prisma.answer.delete({
      where: {
        id: answer.id?.toString(),
      },
    })
  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer)

    await Promise.all([
      this.prisma.answer.update({
        where: {
          id: data.id,
        },
        data,
      }),
      this.answerAttachmentsRepos.createMany(answer.attachments.getNewItems()),

      this.answerAttachmentsRepos.deleteMany(
        answer.attachments.getRemovedItems(),
      ),
    ])

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }
}
