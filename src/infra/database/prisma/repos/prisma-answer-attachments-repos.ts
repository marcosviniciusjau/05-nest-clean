import { AnswerAttachmentsRepos } from '@/domain/forum/application/repos/answer-attachment-repos'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma-service'
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-answer-attachment-mapper'

@Injectable()
export class PrismaAnswerAttachmentsRepos implements AnswerAttachmentsRepos {
  constructor(private prisma: PrismaService) {}
  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
    const data = PrismaAnswerAttachmentMapper.toPrismaUpdateMany(attachments)
    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
    const attachmentsIds = attachments.map((attachment) => {
      return attachment.id.toString()
    })

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentsIds,
        },
      },
    })
  }

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
