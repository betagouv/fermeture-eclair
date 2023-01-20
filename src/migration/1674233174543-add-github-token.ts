import { MigrationInterface, QueryRunner } from "typeorm";

export class addGithubToken1674233174543 implements MigrationInterface {
    name = 'addGithubToken1674233174543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "git_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "encryptedToken" character varying NOT NULL, "expirationDate" date NOT NULL, CONSTRAINT "UQ_d2587df9aead71c60f7ac9809e3" UNIQUE ("encryptedToken"), CONSTRAINT "PK_d714584c5f3870ffeff2e1800c5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "git_token"`);
    }

}
