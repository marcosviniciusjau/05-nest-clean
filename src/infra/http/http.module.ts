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

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthController,
    CreateQuestionController,
    ListQuestionController,
    GetQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController
  ],
  providers: [
    CreateQuestionUseCase,
    ListRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthStudentUseCase,
    GetQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase
  ],
})
export class HttpModule {}
