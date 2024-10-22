import { Module } from '@nestjs/common'
import { AuthController } from './controllers/auth.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { ListQuestionController } from './controllers/list-questions-controller'

import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthController,
    CreateQuestionController,
    ListQuestionController,
  ],
})
export class HttpModule {}
