import { ApiProperty } from '@nestjs/swagger';

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
  role: number;
}
