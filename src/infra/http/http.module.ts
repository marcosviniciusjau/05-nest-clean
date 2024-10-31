import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { ListQuestionController } from './controllers/list-questions-controller'

import { DatabaseModule } from '../database/database.module'

import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { AuthStudentUseCase } from '@/domain/forum/application/use-cases/auth-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { GetQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug'
import { EditQuestionController } from './controllers/edit-question-controller'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { ChooseBestAnswerController } from './controllers/choose-best-answer.controller'
import { ChooseBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-best-answer'
import { CommentQuestionUseCase } from '@/domain/forum/application/use-cases/comment-question'
import { CommentOnQuestionController } from './controllers/comment-on-question-controller'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comments'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { CommentAnswerUseCase } from '@/domain/forum/application/use-cases/comment-answer'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comments'
import { ListQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/list-question-comments'
import { ListQuestionCommentsController } from './controllers/list-question-comments.controller'
import { ListAnswerCommentsController } from './controllers/list-answer-comments.controller'
import { ListAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/list-answer-comments'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthController,
    CreateQuestionController,
    ListQuestionController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    DeleteAnswerController,
    EditAnswerController,
    ChooseBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    ListQuestionCommentsController,
    ListAnswerCommentsController,
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    DeleteAnswerUseCase,
    EditAnswerUseCase,
    ChooseBestAnswerUseCase,
    CommentQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentAnswerUseCase,
    DeleteAnswerCommentUseCase,
    ListQuestionCommentsUseCase,
    ListAnswerCommentsUseCase,
  ],
})
export class HttpModule {}
