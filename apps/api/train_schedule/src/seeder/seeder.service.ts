// src/seeder/seeder.service.ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Schedule)
    private scheduleRepo: Repository<Schedule>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.scheduleRepo.count();
    if (count === 0) {
      console.log('Seeding schedule table...');
      await this.scheduleRepo.save([
        {
            origin: "London",
            destination: "Birmingham",
            departureTime: "07:15",
            arrivalTime: "09:30",
            date: "2025-05-01",
            trainNumber: "A111"
          },
          {
            origin: "Oxford",
            destination: "Wolverhampton",
            departureTime: "10:00",
            arrivalTime: "12:45",
            date: "2025-05-01",
            trainNumber: "B222"
          },
          {
            origin: "Manchester",
            destination: "Leeds",
            departureTime: "13:30",
            arrivalTime: "14:15",
            date: "2025-05-02",
            trainNumber: "C333"
          },
          {
            origin: "Bristol",
            destination: "Cardiff",
            departureTime: "15:00",
            arrivalTime: "15:50",
            date: "2025-05-02",
            trainNumber: "D444"
          },
          {
            origin: "Edinburgh",
            destination: "Glasgow",
            departureTime: "16:30",
            arrivalTime: "17:10",
            date: "2025-05-03",
            trainNumber: "E555"
          },
          {
            origin: "Newcastle",
            destination: "York",
            departureTime: "18:00",
            arrivalTime: "18:50",
            date: "2025-05-03",
            trainNumber: "F666"
          },
          {
            origin: "Liverpool",
            destination: "Sheffield",
            departureTime: "19:30",
            arrivalTime: "20:50",
            date: "2025-05-04",
            trainNumber: "G777"
          },
          {
            origin: "Southampton",
            "destination": "Brighton",
            departureTime: "08:30",
            arrivalTime: "09:40",
            date: "2025-05-04",
            trainNumber: "H888"
          },
          {
            origin: "Cambridge",
            destination: "Norwich",
            departureTime: "11:15",
            arrivalTime: "12:20",
            date: "2025-05-05",
            trainNumber: "I999"
          },
          {
            origin: "Plymouth",
            destination: "Exeter",
            departureTime: "13:45",
            arrivalTime: "14:25",
            date: "2025-05-05",
            trainNumber: "J000"
          }
      ]);
      console.log('Seeded 10 schedules.');
    }
  }
}
