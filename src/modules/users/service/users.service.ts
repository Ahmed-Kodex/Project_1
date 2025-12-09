import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { User } from '../../../database/entities/user.entity';
import { MESSAGES } from '../../../config/messages';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async hashPassword(pwd: string): Promise<string> {
    const result = await (
      hash as unknown as (password: string, rounds: number) => Promise<string>
    )(pwd, 10);
    return result;
  }
  async findAll() {
    const users = await this.usersRepository.find();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...rest }: User) => rest);
  }
  async create(username: string, email: string, password: string) {
    const exists = await this.usersRepository.findOne({
      where: [{ username }, { email }],
    });
    if (exists) throw new BadRequestException(MESSAGES.ALREADY_IN_USE);
    const hashed = await this.hashPassword(password);
    const user = this.usersRepository.create({
      username,
      email,
      password: hashed,
    });
    return this.usersRepository.save(user);
  }
  async findAllpaginated({ page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    const [users, total] = await this.usersRepository.findAndCount({
      skip,
      take: limit,
      order: { id: 'ASC' },
    });
    const cleanedUsers = users.map(({ ...rest }) => rest);
    return {
      message: MESSAGES.USERS_FETCHED,
      users: cleanedUsers,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  async createSocialUser(data: Partial<User>): Promise<User> {
    const exists = await this.usersRepository.findOne({
      where: [{ email: data.email }],
    });
    if (exists) throw new BadRequestException(MESSAGES.EMAIL_ALREADY_USE);
    const hashed = await this.hashPassword(
      data.password ?? Math.random().toString(36).slice(-10),
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
    const hashed = await this.hashPassword(newPassword);
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
