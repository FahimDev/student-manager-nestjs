import { ApiProperty } from '@nestjs/swagger';
import { ProgramType, Student } from '@prisma/client';

export class CreateProgramDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;   
  @ApiProperty()
  type: ProgramType;
  student?: Student;
}
