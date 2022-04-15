import { Allow, IsNotEmpty, IsString } from 'class-validator';

export default class ProgramRequestDto {
  @IsString()
  @IsNotEmpty()
  coachId: string;

  @Allow()
  traineeId: string;
}
