import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { AnswersRepos } from '@/domain/forum/application/repos/answer-repos'
import { BestAnswerChosen } from '@/domain/forum/enterprise/events/best-answer-chosen'

export class OnBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepos: AnswersRepos,
    private sendNotification: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendBestAnswerNotification.bind(this),
      OnBestAnswerChosen.name,
    )
  }

  private async sendBestAnswerNotification({
    question,
    bestAnswerId,
  }: BestAnswerChosen) {
    const answer = await this.answersRepos.findById(bestAnswerId.toString())

    if (answer) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Sua resposta foi escolhida`,
        content: `A resposta ${question.title.substring(0, 20).concat('...')} foi escolhida pelo autor.`,
      })
    }
  }
}
