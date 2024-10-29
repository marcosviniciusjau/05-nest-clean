import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma-service'
import { PrismaQuestionsRepos } from './prisma/repos/prisma-questions-repos'
import { PrismaQuestionCommentsRepos } from './prisma/repos/prisma-question-comments'
import { PrismaQuestionAttachmentsRepos } from './prisma/repos/prisma-question-attachments'
import { PrismaAnswerCommentsRepos } from './prisma/repos/prisma-answer-comments-repos'
import { PrismaAnswerAttachmentRepos } from './prisma/repos/prisma-answer-attachments-repos'
import { QuestionsRepos } from '@/domain/forum/application/repos/question-repos'
import { StudentRepos } from '@/domain/forum/application/repos/student-repos'
import { PrismaStudentRepos } from './prisma/repos/prisma-student-repos'
import { QuestionCommentsRepos } from '@/domain/forum/application/repos/question-comment-repos'
import { QuestionAttachmentsRepos } from '@/domain/forum/application/repos/question-attachments-repos'
import { AnswerCommentsRepos } from '@/domain/forum/application/repos/answer-comment-repos'
import { AnswerAttachmentRepos } from '@/domain/forum/application/repos/answer-attachment-repos'
import { AnswersRepos } from '@/domain/forum/application/repos/answer-repos'
import { PrismaAnswersRepos } from './prisma/repos/prisma-answers-repos'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepos,
      useClass: PrismaQuestionsRepos,
    },
    {
      provide: StudentRepos,
      useClass: PrismaStudentRepos,
    },
    {
      provide: QuestionsRepos,
      useClass: PrismaQuestionsRepos,
    },
    {
      provide: AnswersRepos,
      useClass: PrismaAnswersRepos,
    },
    {
      provide: QuestionCommentsRepos,
      useClass: PrismaQuestionCommentsRepos,
    },
    {
      provide: QuestionAttachmentsRepos,
      useClass: PrismaQuestionAttachmentsRepos,
    },
    {
      provide: AnswerCommentsRepos,
      useClass: PrismaAnswerCommentsRepos,
    },
    {
      provide: AnswerAttachmentRepos,
      useClass: PrismaAnswerAttachmentRepos,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepos,
    StudentRepos,
    AnswersRepos,
    QuestionCommentsRepos,
    QuestionAttachmentsRepos,
    AnswerCommentsRepos,
    AnswerAttachmentRepos,
  ],
})
export class DatabaseModule {}
