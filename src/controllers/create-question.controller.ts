import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard'
import { CurrentUser } from 'src/auth/current-user-decorator'
import { TokenSchema } from 'src/auth/jwt-strategy'

import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma-service'

const createQuestionSchema = z.object({
  title: z.string(),
  content: z.string(),
})
const bodyValidation = new ZodValidationPipe(createQuestionSchema)
type CreateQuestionSchema = z.infer<typeof createQuestionSchema>
@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}
  @Post()
  async handle(
    @Body(bodyValidation)
    body: CreateQuestionSchema,
    @CurrentUser() user: TokenSchema,
  ) {
    const { title, content } = body
    const { sub: userId } = user
    const slug = this.convertToSlug(title)
    await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    })
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}
