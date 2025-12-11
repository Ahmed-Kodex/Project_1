import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Audience } from './audience.entity';
import { VideoSpec } from './video-spec.entity';
import { Avatar } from './avatar.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int', nullable: true })
  audienceId: number;

  @ManyToOne(() => Audience, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'audienceId' })
  audience: Audience;

  @Column({ type: 'int', nullable: true })
  videoSpecId: number;

  @ManyToOne(() => VideoSpec, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'videoSpecId' })
  videoSpec: VideoSpec;

  @Column({ type: 'int', nullable: true })
  avatarId: number;

  @ManyToOne(() => Avatar, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'avatarId' })
  avatar: Avatar;

  @Column({ type: 'text', nullable: true })
  hookIds: string;

  @Column({ type: 'text', nullable: true })
  script: string;

  @Column({ type: 'enum', enum: ['draft', 'completed'], default: 'draft' })
  status: 'draft' | 'completed';

  @Column({ type: 'int', default: 1 })
  currentStep: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
