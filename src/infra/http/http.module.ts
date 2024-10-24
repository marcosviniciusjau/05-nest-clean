import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { ListQuestionController } from './controllers/list-questions-controller'

import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { ListRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/list-recent-questions'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthController,
    CreateQuestionController,
    ListQuestionController,
  ],
  providers: [CreateQuestionUseCase, ListRecentQuestionsUseCase],
})
export class HttpModule {}
