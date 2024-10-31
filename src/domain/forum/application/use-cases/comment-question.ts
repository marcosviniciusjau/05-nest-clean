import { QuestionsRepos } from '../repos/question-repos'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepos } from '../repos/question-comment-repos'
import { Either, left, right } from '@/core/either'
import { NotFoundError } from '@/core/errors/errors/not-found-error'
import { Injectable } from '@nestjs/common'
interface CommentQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentQuestionUseCaseResponse = Either<
  NotFoundError,
  {
    questionComment: QuestionComment
  }
>
@Injectable()
export class CommentQuestionUseCase {
  constructor(
    private questionsRepos: QuestionsRepos,
    private questionCommentRepos: QuestionCommentsRepos,
  ) {}

  async execute({
    authorId,
    questionId,
    content,
  }: CommentQuestionUseCaseRequest): Promise<CommentQuestionUseCaseResponse> {
    const question = await this.questionsRepos.findById(questionId)
    if (!question) {
      return left(new NotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    })

    await this.questionCommentRepos.create(questionComment)
    return right({
      questionComment,
    })
  }
}
