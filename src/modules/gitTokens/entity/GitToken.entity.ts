import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GitToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    encryptedToken: string;

    @Column({ type: 'date' })
    expirationDate: Date;
}
