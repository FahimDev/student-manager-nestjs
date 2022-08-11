import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';
import { DBService } from 'src/database/db.service';

const db = new DBService();

@Injectable()
export class StudentsService {
    async findAll() {
        const students: Student[] = await db.student.findMany()
        return students;
    }
}
