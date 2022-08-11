import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@Controller('students')
export class StudentsController {

    // @Post()
    // create(){
    //     return 0;
    // }

    @Get('all')
    findAll(){
        return 0;
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return id;
    }

    @Patch(':id')
    update(){
        return 0;
    }

    @Delete(':id')
    remove(){
        return 0;
    }

}
