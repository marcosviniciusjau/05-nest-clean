import { QuestionAttachmentsRepos } from '@/domain/forum/application/repos/question-attachments-repos'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma-service'
import { PrismaQuestionAttachmentMapper } from '../mappers/prisma-question-attachment-mapper'

@Injectable()
export class PrismaQuestionAttachmentsRepos
  implements QuestionAttachmentsRepos
{
  constructor(private prisma: PrismaService) {}
  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
    const data = PrismaQuestionAttachmentMapper.toPrismaUpdateMany(attachments)
    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
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

  async findByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    const questionAttachment = await this.prisma.attachment.findMany({
      where: {
        questionId,
      },
    })
    return questionAttachment.map(PrismaQuestionAttachmentMapper.toDomain)
  }

  async deleteByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        questionId,
      },
    })
  }
}
