import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password);    // Authenticating Password.
    if (user && isMatch) {
        const { password, ...result } = user;
        return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload, {secret: jwtConstants.secret, expiresIn: "60s"}),
    };
  }
}
