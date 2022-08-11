import { Module } from '@nestjs/common';
import { StudentsController } from './controllers/students/students.controller';
import { StudentsService } from './services/students/students.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
