import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '../config/config.service';

@Injectable()
export class MailService {
  private transporter: any;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',

      auth: {
        user: this.configService.MailConfig.user,
        pass: this.configService.MailConfig.password,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: '<no-reply> RTMB',
      to,
      subject,
      text,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
