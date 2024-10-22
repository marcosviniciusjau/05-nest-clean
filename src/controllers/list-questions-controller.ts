import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma-service'

import { z } from 'zod'
const page = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidation = new ZodValidationPipe(page)
type PageQuerySchema = z.infer<typeof page>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class ListQuestionController {
  constructor(private prisma: PrismaService) {}
  @Get()
  async handle(@Query('page', queryValidation) page: PageQuerySchema) {
    const perPage = 1
    const questions = await this.prisma.question.findMany({
      take: 1,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return {
      questions,
    }
  }
}
