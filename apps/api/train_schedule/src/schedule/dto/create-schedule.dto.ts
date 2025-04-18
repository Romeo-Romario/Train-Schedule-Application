import { IsNotEmpty, IsString, IsDate, } from "class-validator";

export class CreateScheduleDto {
    @IsNotEmpty()
    @IsString()
    origin: string;
    @IsNotEmpty()
    @IsString()
    destination: string;
    @IsNotEmpty()
    @IsString()
    departureTime: string;
    @IsNotEmpty()
    @IsString()
    arrivalTime: string;
    @IsNotEmpty()
    @IsString()
    date: string;
    @IsNotEmpty()
    @IsString()
    trainNumber: string;
}
