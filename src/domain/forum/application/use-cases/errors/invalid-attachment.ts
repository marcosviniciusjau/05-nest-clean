import { UseCaseError } from '@/core/errors/use-case-error'

export class InvalidAttachment extends Error implements UseCaseError {
  constructor(type: string) {
    super(`File type ${type} is not valid`)
  }
}
