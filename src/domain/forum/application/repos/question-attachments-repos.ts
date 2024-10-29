import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export abstract class QuestionAttachmentsRepos {
  abstract findByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  abstract deleteByQuestionId(questionId: string): Promise<void>
}
