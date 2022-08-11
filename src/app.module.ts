import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [StudentsModule, AdminsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
