import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ProgramsModule } from './programs/programs.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { DBService } from './database/db.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    StudentsModule,
    AdminsModule,
    AuthModule,
    UsersModule,
    ProgramsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService, DBService, JwtService],
})
export class AppModule {}
