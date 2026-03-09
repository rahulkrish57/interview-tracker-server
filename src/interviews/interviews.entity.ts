import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';

export enum ModeOfWork {
  ONSITE = 'onsite',
  HYBRID = 'hybrid',
  REMOTE = 'remote',
}

export enum InterviewStatus {
  PHONE = 'phone',
  SCREENING = 'screening',
  INTERVIEW = 'interview',
  REJECTED = 'rejected',
  GHOSTED = 'ghosted',
  UNINTERESTING = 'uninteresting',
}

@Entity('interviews')
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  hr_name: string;

  @Column({ nullable: true })
  contact: string;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: ModeOfWork })
  mode_of_work: ModeOfWork;

  @Column({ nullable: true })
  expected_ctc: string;

  @Column({ type: 'enum', enum: InterviewStatus })
  status: InterviewStatus;

  @Column({ nullable: true, type: 'text' })
  notes: string;

  @Column({ type: 'date' })
  applied_date: string;

  // ← NEW: link to user
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}