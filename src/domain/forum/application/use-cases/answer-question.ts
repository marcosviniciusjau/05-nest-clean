import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepos } from '../repos/answer-repos'
import { Either, right } from '@/core/either'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'

interface AnswerAnswerUseCaseRequest {
  instructorId: string
  answerId: string
  attachmentsIds: string[]
  content: string
}
type AnswerAnswerUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>
export class AnswerAnswerUseCase {
  constructor(private answersRepo: AnswersRepos) {}

  async execute({
    instructorId,
    answerId,
    content,
    attachmentsIds,
  }: AnswerAnswerUseCaseRequest): Promise<AnswerAnswerUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityID(instructorId),
      questionId: new UniqueEntityID(answerId),
    })

    const answerAttachments = attachmentsIds.map((attachmentId) =>
      AnswerAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        answerId: answer.id,
      }),
    )

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepo.create(answer)

    return right({ answer })
  }
}
