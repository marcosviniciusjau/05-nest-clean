import { AnswerAttachmentRepos } from '@/domain/forum/application/repos/answer-attachment-repos'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma-service'
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-answer-attachment-mapper'

@Injectable()
export class PrismaAnswerAttachmentRepos implements AnswerAttachmentRepos {
  constructor(private prisma: PrismaService) {}
  async findByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachment = await this.prisma.attachment.findMany({
      where: {
        answerId,
      },
    })
    return answerAttachment.map(PrismaAnswerAttachmentMapper.toDomain)
  }

  async deleteByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        answerId,
      },
    })
  }
}
