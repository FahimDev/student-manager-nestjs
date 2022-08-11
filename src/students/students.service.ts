import { Injectable } from '@nestjs/common';
import { Prisma, Student } from '@prisma/client';
import { DBService } from 'src/database/db.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';


@Injectable()
export class StudentsService {

  constructor(private dbService: DBService){}

  async create(student: CreateStudentDto) {
    
    return this.dbService.student.create({
      data: {
        address:student.address,
        email: student.email,
        name: student.name,
        phone:student.phone,
        program_id: student.program_id
      }
    });
  }

  async findAll() {
    const students: Student[] = await this.dbService.student.findMany();
    return students;
  }

  async findOne(id: number) {
    return this.dbService.student.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
