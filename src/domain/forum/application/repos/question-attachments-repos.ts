import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export abstract class QuestionAttachmentsRepos {
  abstract createMany(attachments: QuestionAttachment[]): Promise<void>
  abstract deleteMany(attachments: QuestionAttachment[]): Promise<void>
  abstract findByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  abstract deleteByQuestionId(questionId: string): Promise<void>
}
