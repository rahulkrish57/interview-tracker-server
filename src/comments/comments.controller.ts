import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentsService } from './comments.service';

@UseGuards(JwtAuthGuard)
@Controller('api/interviews/:interviewId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getComments(@Param('interviewId') interviewId: string) {
    return this.commentsService.getComments(interviewId);
  }

  @Post()
  addComment(
    @Param('interviewId') interviewId: string,
    @Body('content') content: string,
    @Req() req,
  ) {
    return this.commentsService.addComment(
      interviewId,
      req.user.userId,
      content,
    );
  }

  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: string, @Req() req) {
    return this.commentsService.deleteComment(commentId, req.user.userId);
  }
}
