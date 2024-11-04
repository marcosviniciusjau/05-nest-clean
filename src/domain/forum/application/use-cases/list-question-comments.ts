import { QuestionCommentsRepos } from '@/domain/forum/application/repos/question-comments-repos'
import { Either, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { CommentWithAuthor } from '../../enterprise/entities/value-objects/comment-with-author'

interface ListQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type ListQuestionCommentsUseCaseResponse = Either<
  null,
  {
    comments: CommentWithAuthor[]
  }
>

@Injectable()
export class ListQuestionCommentsUseCase {
  constructor(private questionCommentsRepos: QuestionCommentsRepos) {}

  async execute({
    questionId,
    page,
  }: ListQuestionCommentsUseCaseRequest): Promise<ListQuestionCommentsUseCaseResponse> {
    const comments =
      await this.questionCommentsRepos.findByQuestionIdWithAuthor(questionId, {
        page,
      })
    return right({
      comments,
    })
  }
}
