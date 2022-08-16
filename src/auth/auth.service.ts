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
    let response: Iresponse;

    const userInfo = await this.usersService.findOne(user.username); // Getting User info from User Module

    if (userInfo) {
      data = { username: userInfo.username, role: userInfo.role };
      response = await this.manageResponse(
        'Login Successful!',
        'success',
        data,
      );
    } else {
      response = await this.manageResponse('User not found!', 'failed');
    }
    const digitalSignature = await this.generateSignature(userInfo);
    return res
      .set({
        'access-token': digitalSignature,
        'token-type': 'Bearer',
      }) //  Returning a Signed API Token in herder
      .json(response); // Body content included
  }

  private async generateSignature(payloadContent: any) {
    const payload = {
      sub: payloadContent.id,
      username: payloadContent.username,
      email: payloadContent.email,
      role: payloadContent.role,
    }; // Preparing API payload packet for generating Digital Signature
    return this.jwtService.sign(payload);
  }

  async manageResponse(status: string, message: string, data?: any) {
    let messages: string[] = [];
    let response: Iresponse = null;
    messages.push(message);
    response = {
      status: status,
      messages: messages,
    };
    return data ? { ...response, data: data } : response;
  }
}
