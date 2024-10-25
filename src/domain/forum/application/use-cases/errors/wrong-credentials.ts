import { UseCaseError } from '@/core/errors/use-case-error'

export class WrongCredentials extends Error implements UseCaseError {
  constructor() {
    super('Credentials are wrong')
  }
}
