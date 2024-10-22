import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttachmentRepos {
  findByAnswerId(AnswerId: string): Promise<AnswerAttachment[]>
  deleteByAnswerId(AnswerId: string): Promise<void>
}
