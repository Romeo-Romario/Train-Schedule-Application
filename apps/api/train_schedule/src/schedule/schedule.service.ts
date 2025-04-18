import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class ScheduleService {
  constructor(@InjectRepository(Schedule)
        private readonly scheduleRepository: Repository<Schedule>,){}

  async create(createScheduleDto: CreateScheduleDto) : Promise<Schedule> {
    const newSchedule = this.scheduleRepository.create(createScheduleDto);
    return await this.scheduleRepository.save(newSchedule);
  }

  findAll() {
    return this.scheduleRepository.find();
  }

  findOne(id: number) {
    return this.scheduleRepository.findOne({where : {id }});
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return this.scheduleRepository.update(id, updateScheduleDto);
  }

  remove(id: number) {
    return this.scheduleRepository.delete(id);
  }

  async findGroup(param1: string , param2: string){
    const allowedColumns = {
      origin: 'string',
      destination: 'string',
      trainNumber: 'string',
      departureTime: 'string',
      arrivalTime: 'string',
      date: 'string',
    };
  
    const columnType = allowedColumns[param1];
  
    if (!columnType) {
      throw new BadRequestException(`Can only search by: ${Object.keys(allowedColumns).join(', ')}`);
    }
  
    if (columnType === 'string' && typeof param2 !== 'string') {
      throw new BadRequestException(`Expected string for ${param1}`);
    }
    const result = this.scheduleRepository
    .createQueryBuilder('schedule')
    .where(`CAST(schedule.${param1} AS TEXT) LIKE :value`, {
      value: `${param2}%`
    })
    .getMany();

    return result || [];
  }
}
