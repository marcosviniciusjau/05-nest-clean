import { UseCaseError } from '@/core/errors/use-case-error'

export class NotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found')
  }
}
