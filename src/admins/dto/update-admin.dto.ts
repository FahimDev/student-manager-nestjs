import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdminDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  phone: string;   
  @ApiProperty()
  designation: string;
}
