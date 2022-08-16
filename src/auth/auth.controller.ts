import {
  Controller,
  Request,
  Response,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { Response as Res } from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-cred.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req: AuthDto, @Response() res: Res) {
    return this.authService.login(req, res);
  }

  @ApiHeader({
    name: 'Authorization',
  })
  @UseGuards(JwtAuthGuard)
  @Get('try')
  try(@Request() req) {
    return 'Hello';
  }
}
