import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { Student } from '../../enterprise/entities/student'
import { StudentRepos } from '../repos/student-repos'
import { HashGenerator } from '../cryptography/hash-generator'
import { StudentExists } from './errors/student-exists'
interface RegisterStudentUseCaseRequest {
  name: string
  email: string
  password: string
}
type RegisterStudentUseCaseResponse = Either<
  StudentExists,
  {
    student: Student
  }
>
@Injectable()
export class RegisterStudentUseCase {
  constructor(
    private studentsRepos: StudentRepos,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterStudentUseCaseRequest): Promise<RegisterStudentUseCaseResponse> {
    const studentExits = await this.studentsRepos.findByEmail(email)

    if (studentExits) {
      return left(new StudentExists(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const student = Student.create({
      name,
      email,
      password: hashedPassword,
    })
    await this.studentsRepos.create(student)
    return right({ student })
  }
}
