import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Schedule } from './schedule/entities/schedule.entity';
import { DataSource } from 'typeorm';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory :(configService: ConfigService) => ({
        type: "postgres",
        url: configService.get<string>('DB_URL'),
        entities: [User, Schedule],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false, 
        },
      }),
    }),
    UserModule,
    ScheduleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  async onApplicationBootstrap() {
    try {
      if (this.dataSource.isInitialized) {
        console.log('✅ Successfully connected to the database');
      } else {
        await this.dataSource.initialize();
        console.log('✅ Database connection initialized manually');
      }
    } catch (err) {
      console.error('❌ Failed to connect to the database:', err);
    }
  }
}