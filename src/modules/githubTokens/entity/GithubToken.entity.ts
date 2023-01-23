import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GithubToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    encryptedToken: string;

    @Column()
    repositoryOwner: string;

    @Column()
    repositoryName: string;

    @Column({ type: 'date' })
    expirationDate: Date;
}
