import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export abstract class AnswerAttachmentRepos {
  abstract findByAnswerId(AnswerId: string): Promise<AnswerAttachment[]>
  abstract deleteByAnswerId(AnswerId: string): Promise<void>
}
