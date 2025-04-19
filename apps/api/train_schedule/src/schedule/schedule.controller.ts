import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Query } from '@nestjs/common';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post('create')
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    await this.scheduleService.create(createScheduleDto);
    return {message: "Schedule succssesfully added"}
  }

  @Get('all')
  findAll(@Query('sortBy') sortBy?: string) {
    return this.scheduleService.findAll(sortBy);
  }

  @Get('search')
  findGroup(
  @Query('param1') param1: string,
  @Query('param2') param2: string,
  @Query('sortBy') sortBy?: string
  ) {
  return this.scheduleService.findGroup(param1, param2, sortBy);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scheduleService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleService.update(+id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scheduleService.remove(+id);
  }
}
