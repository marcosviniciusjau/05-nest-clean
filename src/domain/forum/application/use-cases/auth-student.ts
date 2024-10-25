import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { StudentRepos } from '../repos/student-repos'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { WrongCredentials } from './errors/wrong-credentials'
interface AuthStudentUseCaseRequest {
  email: string
  password: string
}
type AuthStudentUseCaseResponse = Either<
  WrongCredentials,
  {
    token: string
  }
>
@Injectable()
export class AuthStudentUseCase {
  constructor(
    private studentsRepos: StudentRepos,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthStudentUseCaseRequest): Promise<AuthStudentUseCaseResponse> {
    const student = await this.studentsRepos.findByEmail(email)

    if (!student) {
      return left(new WrongCredentials())
    }

    const isValid = await this.hashComparer.compare(password, student.password)
    if (!isValid) {
      return left(new WrongCredentials())
    }

    const token = await this.encrypter.encrypt({ sub: student.id.toString() })
    return right({
      token,
    })
  }
}
