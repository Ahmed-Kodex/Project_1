import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(MailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendOtp(email: string, code: string) {
    const from = process.env.FROM_EMAIL;
    const info = await this.transporter.sendMail({
      from,
      to: email,
      subject: 'Your OTP code',
      text: `Your verification code is ${code}. It expires in ${process.env.OTP_EXPIRES_MINUTES || 10} minutes.`,
    });
    this.logger.log(`OTP email sent: ${info.messageId}`);
    return info;
  }
}
