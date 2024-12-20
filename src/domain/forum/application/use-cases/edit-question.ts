import { Either, left, right } from '@/core/either'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepos } from '../repos/question-repos'
import { NotFoundError } from '@/core/errors/errors/not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { QuestionAttachmentsRepos } from '../repos/question-attachments-repos'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  NotFoundError | NotAllowedError,
  {
    question: Question
  }
>
@Injectable()
export class EditQuestionUseCase {
  constructor(
    private questionsRepos: QuestionsRepos,
    private questionAttachments: QuestionAttachmentsRepos,
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepos.findById(questionId)

    if (!question) {
      return left(new NotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments =
      await this.questionAttachments.findByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(
      currentQuestionAttachments,
    )

    const questionAttachments = attachmentsIds.map((attachmentId) =>
      QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      }),
    )
    questionAttachmentList.update(questionAttachments)
    question.attachments = questionAttachmentList
    question.title = title
    question.content = content

    await this.questionsRepos.save(question)
    return right({ question })
  }
}
