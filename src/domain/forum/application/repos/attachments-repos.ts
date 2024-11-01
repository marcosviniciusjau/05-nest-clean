import { Attachment } from '../../enterprise/entities/attachment'

export abstract class AttachmentRepos {
  abstract create(attachment: Attachment): Promise<void>
}
