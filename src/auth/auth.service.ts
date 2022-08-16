import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(pass, user.password); // Authenticating Password.
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userInfo = await this.usersService.findOne(user.username); // Getting User info from User Module
    const payload = {
      sub: userInfo.id,
      username: userInfo.username,
      email: userInfo.email,
      role: userInfo.role,
    }; // Preparing API payload packet for generating Digital Signature
    return {
      access_token: this.jwtService.sign(payload), //  Returning a Signed API Token
    };
  }
}
