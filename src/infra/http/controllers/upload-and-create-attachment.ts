import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'
import { InvalidAttachment } from '@/domain/forum/application/use-cases/errors/invalid-attachment'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { AttachmentsRepos } from '@/domain/forum/application/repos/attachments-repos'
import { Uploader } from '@/domain/forum/storage/uploader'

interface UploadAndCreateAttachmentUseCaseRequest {
  fileName: string
  fileType: string
  body: Buffer
}
type UploadAndCreateAttachmentUseCaseResponse = Either<
  InvalidAttachment,
  {
    attachment: Attachment
  }
>
@Injectable()
export class UploadAndCreateAttachmentUseCase {
  constructor(
    private AttachmentsRepos: AttachmentsRepos,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentUseCaseRequest): Promise<UploadAndCreateAttachmentUseCaseResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachment(fileType))
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.AttachmentsRepos.create(attachment)
    return right({ attachment })
  }
}
