import { Attachment } from '../../enterprise/entities/attachment'

export abstract class AttachmentsRepos {
  abstract create(attachment: Attachment): Promise<void>
}
