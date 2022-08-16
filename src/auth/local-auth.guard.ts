import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    const messages: string[] = [];
    let status: string = '';
    let response: Iresponse = null;
    if (err || !user) {
      status = 'failed';
      messages.push('Invalid Credentials!');
      response = {
        status: status,
        messages: messages,
      };
      throw new UnauthorizedException(response);
    } else {
      return user;
    }
  }
}
