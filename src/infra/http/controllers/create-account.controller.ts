import {
  ConflictException,
  Body,
  Controller,
  Post,
  HttpCode,
  UsePipes,
} from '@nestjs/common'

import { hash } from 'bcryptjs'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { z } from 'zod'

const createAccountSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

type CreateAccountSchema = z.infer<typeof createAccountSchema>
@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async handle(@Body() body: CreateAccountSchema) {
    const { name, email, password } = body

    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userExists) {
      throw new ConflictException('User already exists')
    }

    const hashedPassword = await hash(password, 8)
    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}
