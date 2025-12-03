import { Injectable, Logger } from '@nestjs/common';
import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailService {
  private logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter<SentMessageInfo>;

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

  async sendOtp(email: string, code: string): Promise<SentMessageInfo> {
    const from = process.env.FROM_EMAIL;
    const mailOptions: SendMailOptions = {
      from,
      to: email,
      subject: 'Your OTP code',
      text: `Your verification code is ${code}. It expires in ${process.env.OTP_EXPIRES_MINUTES || 10} minutes.`,
    };

    const info = await this.transporter.sendMail(mailOptions);
    this.logger.log(`OTP email sent: ${info.messageId}`);
    return info;
  }
}
