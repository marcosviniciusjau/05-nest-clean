import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentRepos {
  findByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteByQuestionId(questionId: string): Promise<void>
}
