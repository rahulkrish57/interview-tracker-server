import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview } from './interviews.entity';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
import { HistoryService } from '../history/history.service';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectRepository(Interview)
    private interviewRepository: Repository<Interview>,
    private historyService: HistoryService,
  ) {}

  async create(dto: CreateInterviewDto, userId: string): Promise<Interview> {
    const interview = this.interviewRepository.create({
      ...dto,
      user_id: userId,
    });
    const saved = await this.interviewRepository.save(interview);

    // Log created event
    await this.historyService.logCreated(saved.id, saved.company);

    return saved;
  }

  async findAll(userId: string): Promise<Interview[]> {
    return this.interviewRepository.find({
      where: { user_id: userId },
      order: { applied_date: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Interview> {
    const interview = await this.interviewRepository.findOne({
      where: { id },
    });

    if (!interview) throw new NotFoundException('Interview not found');
    if (interview.user_id !== userId)
      throw new ForbiddenException('Access denied');

    return interview;
  }

  async update(
    id: string,
    dto: UpdateInterviewDto,
    userId: string,
  ): Promise<Interview> {
    const interview = await this.findOne(id, userId);

    // Log status change if status changed
    if (dto.status && dto.status !== interview.status) {
      await this.historyService.logStatusChange(
        id,
        interview.status,
        dto.status,
      );
    }

    Object.assign(interview, dto);
    return this.interviewRepository.save(interview);
  }

  async remove(id: string, userId: string): Promise<{ message: string }> {
    const interview = await this.findOne(id, userId);
    await this.interviewRepository.remove(interview);
    return { message: `Interview at ${interview.company} deleted` };
  }
}
