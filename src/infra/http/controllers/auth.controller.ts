import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { AuthStudentUseCase } from '@/domain/forum/application/use-cases/auth-student'
import { z } from 'zod'
import { WrongCredentials } from '@/domain/forum/application/use-cases/errors/wrong-credentials'
import { Public } from '@/infra/auth/public'
const authBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthBodySchema = z.infer<typeof authBodySchema>
@Controller('/sessions')
@Public()
export class AuthController {
  constructor(private authStudent: AuthStudentUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(authBodySchema))
  async handle(@Body() body: AuthBodySchema) {
    const { email, password } = body
    const result = await this.authStudent.execute({
      email,
      password,
    })
    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentials:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { token } = result.value

    return {
      token,
    }
  }
}
