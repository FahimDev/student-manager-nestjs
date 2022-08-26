import { Injectable } from '@nestjs/common';
import { DBService } from 'src/database/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private dbService: DBService) {}

  async findOne(username: string) {
    return this.dbService.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updatePassword(username: string, updateUserDto: UpdateUserDto) {
    let data: User = null;
    let response: Iresponse = null;
    try {
      const user = await this.dbService.user.findFirst({
        where: {
          username: username,
        },
      });
      data = await this.authenticateUser(user, updateUserDto);
      if (data) {
        response = await this.manageResponse(
          'success',
          'User password updated successfully!',
        );
      } else {
        response = await this.manageResponse(
          'failed',
          'Sorry, curent password is wrong!',
        );
      }
    } catch (error) {
      response = await this.manageResponse(
        'failed',
        'Password was not updated!',
      );
    } finally {
      return response;
    }
  }

  async authenticateUser(user: User, updateUserDto: UpdateUserDto) {
    let data: User = null;
    const isMatch = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    ); // Authenticating Password.
    if (isMatch) {
      // Password encryption Ref: https://docs.nestjs.com/security/encryption-and-hashing
      const salt = await bcrypt.genSalt(); // Generating Salt for encrypting Password.
      const newHashedPassword = await bcrypt.hash(
        updateUserDto.newPassword,
        salt,
      ); // Plain text password hashed.
      data = await this.dbService.user.update({
        where: {
          id: user.id,
        },
        data: {
          username: user.username,
          password: newHashedPassword,
          role: user.role,
          email: user.email,
        },
      });
    }
    return data;
  }

  async manageResponse(status: string, message: string, data?: any) {
    // Following common standard for API response.
    let messages: string[] = [];
    let response: Iresponse = null;
    messages.push(message);
    response = {
      status: status,
      messages: messages,
    };
    return data ? { ...response, data: data } : response;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
