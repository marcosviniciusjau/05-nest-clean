import { PaginationParams } from '@/core/repos/pagination-params'
import { QuestionCommentsRepos } from '@/domain/forum/application/repos/question-comment-repos'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma-service'
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper'

@Injectable()
export class PrismaQuestionCommentsRepos implements QuestionCommentsRepos {
  constructor(private prisma: PrismaService) {}
  async findByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionComment = await this.prisma.comment.findMany({
      where: {
        questionId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questionComment.map(PrismaQuestionCommentMapper.toDomain)
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: { id },
    })

    if (!questionComment) {
      return null
    }
    return PrismaQuestionCommentMapper.toDomain(questionComment)
  }

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment)

    await this.prisma.comment.create({
      data,
    })
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: questionComment.id.toString(),
      },
    })
  }
}
