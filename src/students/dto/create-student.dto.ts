import { Program } from "@prisma/client";
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {

    @ApiProperty()
    name: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    email:string;
    @ApiProperty()
    program_id: number;
}
