import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { History, HistoryType } from '../history/history.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,

    @InjectRepository(History)
    private historyRepo: Repository<History>,
  ) {}

  async getComments(interviewId: string): Promise<Comment[]> {
    return this.commentRepo.find({
      where: { interview_id: interviewId },
      order: { created_at: 'ASC' },
    });
  }

  async addComment(
    interviewId: string,
    userId: string,
    content: string,
    contentHtml: string,
  ): Promise<Comment> {
    const comment = this.commentRepo.create({
      interview_id: interviewId,
      user_id: userId,
      content,
      content_html: contentHtml,
    });
    const saved = await this.commentRepo.save(comment);

    const history = this.historyRepo.create({
      interview_id: interviewId,
      type: HistoryType.COMMENT_ADDED,
      to_value: content.substring(0, 80),
    });
    await this.historyRepo.save(history);

    return saved;
  }

  async deleteComment(
    commentId: string,
    userId: string,
  ): Promise<{ message: string }> {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId, user_id: userId },
    });

    if (!comment) {
      return { message: 'Comment not found or unauthorized' };
    }

    await this.commentRepo.remove(comment);
    return { message: 'Comment deleted' };
  }
}
