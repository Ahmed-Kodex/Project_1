import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  brandName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  status: number;

  @Column({ nullable: true })
  fileLogo: string;
}
