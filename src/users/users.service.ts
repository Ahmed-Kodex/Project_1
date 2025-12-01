import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { MESSAGES } from '../config/messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async findAll() {
    const users = await this.usersRepository.find();
    return users.map((u) => {
      const { password, ...rest } = u;
      return rest;
    });
  }
  async create(username: string, email: string, password: string) {
    const exists = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });
    if (exists) throw new BadRequestException(MESSAGES.ALREADY_IN_USE);
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      email,
      password: hashed,
    });
    return this.usersRepository.save(user);
  }
  async createSocialUser(data: Partial<User>): Promise<User> {
    const exists = await this.usersRepository.findOne({
      where: [{ email: data.email }],
    });
    if (exists) throw new BadRequestException('Email already in use');
    const hashed = await bcrypt.hash(
      data.password ?? Math.random().toString(36).slice(-10),
      10,
    );
    const user = this.usersRepository.create({
      ...data,
      password: hashed,
    });
    return this.usersRepository.save(user);
  }
  async findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }
  async findBySocialId(socialId: string) {
    return this.usersRepository.findOne({ where: { socialId } });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
  async updatePassword(userId: number, newPassword: string) {
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.usersRepository.update(userId, { password: hashed });
  }
  async findById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }
  async markEmailUnverified(userId: number) {
    await this.usersRepository.update(userId, { isEmailVerified: false });
  }
  async markEmailVerified(userId: number) {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException(MESSAGES.USER_NOT_FOUND);
    user.isEmailVerified = true;
    return this.usersRepository.save(user);
  }
  async save(user: User) {
    return this.usersRepository.save(user);
  }
}
