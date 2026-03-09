import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { ModeOfWork, InterviewStatus } from "../interviews.entity";

export class CreateInterviewDto {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsOptional()
  hr_name?: string;

  @IsString()
  @IsOptional()
  contact?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(ModeOfWork)
  mode_of_work: ModeOfWork;

  @IsString()
  @IsOptional()
  expected_ctc?: string;

  @IsEnum(InterviewStatus)
  status: InterviewStatus;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsDateString()
  applied_date: string;
}
