import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { DBService } from '../database/db.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, DBService],
})
export class StudentsModule {}
