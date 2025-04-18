import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";

@Entity("schedule")
export class Schedule {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column()
    origin: string;
    @Column()
    destination: string;
    @Column({ type: 'time' })
    departureTime: string;
    @Column({ type: 'time' })
    arrivalTime: string;
    @Column({ type: 'date' })
    date: string;
    @Column()
    trainNumber: string;
}
