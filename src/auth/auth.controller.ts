import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-cred.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req: AuthDto ) {
    return this.authService.login(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('try')
  try(@Request() req){
    return "Hello";
  }
}
