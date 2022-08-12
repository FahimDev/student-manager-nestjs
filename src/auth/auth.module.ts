import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { DBService } from 'src/database/db.service';
import { UsersService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';


@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, DBService, UsersService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
