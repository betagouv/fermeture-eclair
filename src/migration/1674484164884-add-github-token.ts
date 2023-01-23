import { MigrationInterface, QueryRunner } from "typeorm";

export class addGithubToken1674484164884 implements MigrationInterface {
    name = 'addGithubToken1674484164884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "github_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "encryptedToken" character varying NOT NULL, "repositoryOwner" character varying NOT NULL, "repositoryName" character varying NOT NULL, "expirationDate" date NOT NULL, CONSTRAINT "UQ_307643cf68ff59bf995d5d9ff63" UNIQUE ("encryptedToken"), CONSTRAINT "PK_983c97d722ea38387618e53ef40" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "github_token"`);
    }

}
