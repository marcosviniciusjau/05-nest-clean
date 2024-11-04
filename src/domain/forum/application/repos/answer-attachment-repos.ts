import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export abstract class AnswerAttachmentsRepos {
  abstract createMany(attachments: AnswerAttachment[]): Promise<void>
  abstract deleteMany(attachments: AnswerAttachment[]): Promise<void>
  abstract findByAnswerId(AnswerId: string): Promise<AnswerAttachment[]>
  abstract deleteByAnswerId(AnswerId: string): Promise<void>
}
