import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateAdminDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  phone: string;   
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: Role;
  @ApiProperty()
  designation: string;
}
