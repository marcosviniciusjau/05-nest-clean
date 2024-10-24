import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma-service'
import { PrismaQuestionsRepos } from './prisma/repos/prisma-questions-repos'
import { PrismaAnswerRepos } from './prisma/repos/prisma-answers-repos'
import { PrismaQuestionCommentsRepos } from './prisma/repos/prisma-question-comments'
import { PrismaQuestionAttachmentsRepos } from './prisma/repos/prisma-question-attachaments'
import { PrismaAnswerCommentRepos } from './prisma/repos/prisma-answer-comments-repos'
import { PrismaAnswerAttachment } from './prisma/repos/prisma-answer-attachments'
import { QuestionsRepos } from '@/domain/forum/application/repos/question-repos'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepos,
      useClass: PrismaQuestionsRepos,
    },
    PrismaQuestionsRepos,
    PrismaAnswerRepos,
    PrismaQuestionCommentsRepos,
    PrismaQuestionAttachmentsRepos,
    PrismaAnswerCommentRepos,
    PrismaAnswerAttachment,
  ],
  exports: [
    PrismaService,
    QuestionsRepos,
    PrismaAnswerRepos,
    PrismaQuestionCommentsRepos,
    PrismaQuestionAttachmentsRepos,
    PrismaAnswerCommentRepos,
    PrismaAnswerAttachment,
  ],
})
export class DatabaseModule {}
