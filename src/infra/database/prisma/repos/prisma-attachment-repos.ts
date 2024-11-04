import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma-service'
import { AttachmentsRepos } from '@/domain/forum/application/repos/attachments-repos'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper'

@Injectable()
export class PrismaAttachmentsRepos implements AttachmentsRepos {
  constructor(private prisma: PrismaService) {}

  async create(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment)

    await this.prisma.attachment.create({
      data,
    })
  }
}
