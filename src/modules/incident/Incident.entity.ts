import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Incident {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    gitGuardianId: number;
}
