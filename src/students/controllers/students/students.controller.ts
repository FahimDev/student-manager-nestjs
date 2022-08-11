import { Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { StudentsService } from 'src/students/services/students/students.service';

@Controller('students')
export class StudentsController {
    
    constructor(private studentService: StudentsService){}

    // @Post()
    // create(){
    //     return 0;
    // }

    @Get('all')
    findAll(){
        return this.studentService.findAll();
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
