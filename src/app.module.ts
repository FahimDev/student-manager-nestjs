import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { AdminsModule } from './admins/admins.module';
import { ProgramsModule } from './programs/programs.module';

@Module({
  imports: [StudentsModule, AdminsModule, ProgramsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
