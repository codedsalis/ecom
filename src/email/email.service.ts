import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async send(
    to: string | Address | (string | Address)[],
    subject: string,
    template: string,
    context: any,
  ): Promise<void> {
    await this.emailQueue.add('send', {
      to,
      subject,
      template,
      context,
    });
  }
}
