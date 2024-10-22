import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/database/prisma/prisma-service'
import { z } from 'zod'
const authBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthBodySchema = z.infer<typeof authBodySchema>
@Controller('/sessions')
export class AuthController {
  constructor(
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authBodySchema))
  async handle(@Body() body: AuthBodySchema) {
    const { email, password } = body
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isValid = await compare(password, user.password)
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const token = this.jwt.sign({ sub: user.id })
    return {
      token,
    }
  }
}
