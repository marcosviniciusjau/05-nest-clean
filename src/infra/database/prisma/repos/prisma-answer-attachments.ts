import { AnswerAttachmentRepos } from '@/domain/forum/application/repos/answer-attachment-repos'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerAttachment implements AnswerAttachmentRepos {
  findByAnswerId(AnswerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteByAnswerId(AnswerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
