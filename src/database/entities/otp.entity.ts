import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  userId: number;

  
  @Column()
  expiresAt: Date;

  @CreateDateColumn({ type: 'timestamp', precision: 0 })
  createdAt: Date;
}
