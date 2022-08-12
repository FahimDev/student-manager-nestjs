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
    let messages: string[] = [];
    let status: string = '';
      try {
        const user = await this.dbService.user.findFirst({
          where: {
            username: username,
          },
        });
        console.log(user);
        const isMatch = await bcrypt.compare(updateUserDto.oldPassword, user.password);    // Authenticating Password.
        console.log(isMatch);
        if (isMatch) {
          // Password encryption Ref: https://docs.nestjs.com/security/encryption-and-hashing
          const salt = await bcrypt.genSalt();    // Generating Salt for encrypting Password.
          const newHashedPassword = await bcrypt.hash(updateUserDto.newPassword, salt);    // Plain text password hashed.
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
          messages.push('User password updated successfully');
          status = 'success';
        } else {
          messages.push('Sorry, curent password is wrong!');
          status = 'failed';
        }
      } catch (error) {
        messages.push('Password was not updated!');
        status = 'failed';
      } finally {
        // Following common standard for API response.
        let response: Iresponse = {
          status: status,
          messages: messages,
        };
        response = data ? { ...response, data: data } : response;
        return response;
      } 
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
