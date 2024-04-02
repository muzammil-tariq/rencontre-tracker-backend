import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class FeedbackDto {
  @IsNotEmpty()
  @IsString()
  userMessage: string;

  @IsOptional()
  @IsEmail()
  userEmail?: string;
}
