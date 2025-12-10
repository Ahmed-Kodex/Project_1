import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { TemplateType } from 'src/common/enums/templateType.enum';

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  thumbnail: string;

  @Column({ type: 'varchar', length: 255 })
  img_path: string;

  @Column({ type: 'int' })
  time_length: number;

  @Column({
    type: 'varchar',
    length: 100,
    default: TemplateType.REALISTIC_CINEMATIC,
  })
  type: TemplateType;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at?: Date;
}
