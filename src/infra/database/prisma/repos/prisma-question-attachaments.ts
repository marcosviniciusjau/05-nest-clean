import { QuestionAttachmentRepos } from '@/domain/forum/application/repos/question-attachment-repos'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaQuestionAttachmentsRepos implements QuestionAttachmentRepos {
  findByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteByQuestionId(questionId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
