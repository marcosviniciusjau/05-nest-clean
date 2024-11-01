import { UseCaseError } from '@/core/errors/use-case-error'

export class StudentExists extends Error implements UseCaseError {
  constructor(id: string) {
    super(`Student ${id} already exists`)
  }
}
