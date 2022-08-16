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

  async login(user: any, res: any) {
    let data: any = null;
    const messages: string[] = [];
    let status: string = '';

    const userInfo = await this.usersService.findOne(user.username); // Getting User info from User Module

    if (userInfo) {
      status = 'success';
      messages.push('Login Successful!');
      data = { username: userInfo.username, role: userInfo.role };
    } else {
      status = 'failed';
      messages.push('User not found!');
    }

    const payload = {
      sub: userInfo.id,
      username: userInfo.username,
      email: userInfo.email,
      role: userInfo.role,
    }; // Preparing API payload packet for generating Digital Signature

    let response: Iresponse = {
      status: status,
      messages: messages,
      data: data,
    }; 

    return res
      .set({
        'access-token': this.jwtService.sign(payload),
        'token-type': 'Bearer',
      })  //  Returning a Signed API Token in herder
      .json(response);  // Body content included
  }
}
