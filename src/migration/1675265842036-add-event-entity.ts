import { MigrationInterface, QueryRunner } from "typeorm";

export class addEventEntity1675265842036 implements MigrationInterface {
    name = 'addEventEntity1675265842036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "payload" character varying NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
