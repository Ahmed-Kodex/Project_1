import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('video_specs')
export class VideoSpec {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  length: number; // in seconds

  @Column({ type: 'varchar', length: 255 })
  goal: string; // e.g., Brand Awareness, Product etc.

  @CreateDateColumn({ type: 'timestamp', precision: 0 })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', precision: 0 })
  updatedAt: Date;
}
