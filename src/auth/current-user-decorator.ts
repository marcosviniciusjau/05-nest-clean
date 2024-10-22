import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { TokenSchema } from './jwt-strategy'

export const CurrentUser = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    return request.user as TokenSchema
  },
)
