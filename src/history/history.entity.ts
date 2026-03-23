import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Interview } from '../interviews/interviews.entity';

export enum HistoryType {
  CREATED = 'created',
  STATUS_CHANGED = 'status_changed',
  COMMENT_ADDED = 'comment_added',
}

@Entity('interview_history')
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: HistoryType,
  })
  type: HistoryType;

  @Column({ nullable: true })
  from_value: string;

  @Column({ nullable: true })
  to_value: string;

  @ManyToOne(() => Interview, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'interview_id' })
  interview: Interview;

  @Column()
  interview_id: string;

  @CreateDateColumn()
  created_at: Date;
}
