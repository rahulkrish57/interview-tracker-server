import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History, HistoryType } from './history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private historyRepo: Repository<History>,
  ) {}

  async getHistory(interviewId: string): Promise<History[]> {
    return this.historyRepo.find({
      where: { interview_id: interviewId },
      order: { created_at: 'DESC' },
    });
  }

  async logCreated(interviewId: string, company: string) {
    const history = this.historyRepo.create({
      interview_id: interviewId,
      type: HistoryType.CREATED,
      to_value: company,
    });
    return this.historyRepo.save(history);
  }

  async logStatusChange(
    interviewId: string,
    fromStatus: string,
    toStatus: string,
  ) {
    const history = this.historyRepo.create({
      interview_id: interviewId,
      type: HistoryType.STATUS_CHANGED,
      from_value: fromStatus,
      to_value: toStatus,
    });
    return this.historyRepo.save(history);
  }
}
