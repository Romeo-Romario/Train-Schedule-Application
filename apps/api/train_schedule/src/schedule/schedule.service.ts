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

  async findAll(sortBy?: string) {
    const allowedSortFields = [
      'origin',
      'destination',
      'trainNumber',
      'departureTime',
      'arrivalTime',
      'date',
    ];
  
    const query = this.scheduleRepository.createQueryBuilder('schedule');
  
    if (sortBy && allowedSortFields.includes(sortBy)) {
      query.orderBy(`schedule.${sortBy}`, 'ASC');
    }
  
    return await query.getMany();
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

  async findGroup(param1: string, param2: string, sortBy?: string) {
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

    if (sortBy && !allowedColumns[sortBy]) {
      throw new BadRequestException(`Can only sort by: ${Object.keys(allowedColumns).join(', ')}`);
    }
  
    if (columnType === 'string' && typeof param2 !== 'string') {
      throw new BadRequestException(`Expected string for ${param1}`);
    }

    const query = this.scheduleRepository
      .createQueryBuilder('schedule')
      .where(`CAST(schedule.${param1} AS TEXT) LIKE :value`, {
        value: `${param2}%`,
      });
  
    if (sortBy) {
      query.orderBy(`schedule.${sortBy}`, 'ASC');
    }
  
    const result = await query.getMany();
    return result || [];
  }
  
}
