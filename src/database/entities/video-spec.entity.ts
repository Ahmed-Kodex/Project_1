import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity('video_specs')
export class VideoSpec {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column({ type: 'int', nullable: true })
  userId: number;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user: User;
 
  @Column({ type: 'int' })
  length: number;

  @Column({ type: 'varchar', length: 255 })
  goal: string; 

  @CreateDateColumn({ type: 'timestamp', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 0 })
  updatedAt: Date;
}
