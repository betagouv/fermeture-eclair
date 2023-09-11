import { MigrationInterface, QueryRunner } from "typeorm";

export class addIncident1694432502339 implements MigrationInterface {
    name = 'addIncident1694432502339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "incident" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gitGuardianId" integer NOT NULL, CONSTRAINT "UQ_81d9e173e0307f6b23684ad2925" UNIQUE ("gitGuardianId"), CONSTRAINT "PK_5f90b28b0b8238d89ee8edcf96e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "incident"`);
    }

}
