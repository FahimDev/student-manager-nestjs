import { Injectable } from '@nestjs/common';
import { DBService } from 'src/database/db.service';
import { Student } from '@prisma/client';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

const db = new DBService();

@Injectable()
export class StudentsService {

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  async findAll() {
    const students: Student[] = await db.student.findMany();
    return students;
  }

  async findOne(id: number) {
    const student: Student = await db.student.findFirst({
      where: {
        id: id,
      },
    });
    return student;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
