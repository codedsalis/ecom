import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class EmailProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process('send')
  async handleSendEmail(job: Job) {
    const { to, subject, template, context } = job.data;
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }
}
