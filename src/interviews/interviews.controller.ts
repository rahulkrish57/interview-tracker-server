import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InterviewsService } from './interviews.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { UpdateInterviewDto } from './dto/update-interview.dto';
interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}
@UseGuards(JwtAuthGuard)
@Controller('api/interviews')
export class InterviewsController {
  constructor(private readonly interviewsService: InterviewsService) {}

  @Post()
  create(@Body() dto: CreateInterviewDto, @Req() req: AuthenticatedRequest) {
    return this.interviewsService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    return this.interviewsService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.interviewsService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateInterviewDto,
    @Req() req: AuthenticatedRequest,
  ) {
    return this.interviewsService.update(id, dto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    return this.interviewsService.remove(id, req.user.userId);
  }
}
