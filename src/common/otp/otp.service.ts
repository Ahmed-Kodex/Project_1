import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Otp } from './otp.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepo: Repository<Otp>,
  ) {}

  async createOtpForUser(userId: number, minutes = 10) {
    const code = Math.floor(1000 + Math.random() * 9000).toString(); // 6-digit
    const expiresAt = new Date(Date.now() + minutes * 60 * 1000);
    const otp = this.otpRepo.create({ code, userId, expiresAt });
    return this.otpRepo.save(otp);
  }

  async validateOtp(userId: number, code: string) {
    const found = await this.otpRepo.findOne({
      where: { userId, code },
      order: { createdAt: 'DESC' },
    });
    if (!found) return false;
    if (found.expiresAt < new Date()) return false;
    // option delete after use
    await this.otpRepo.delete(found.id);
    return true;
  }
  async findByCode(code: string) {
    return this.otpRepo.findOne({ where: { code } });
  }
}
