import { MigrationInterface, QueryRunner } from "typeorm";

export class addCreationDateForGithubToken1675344984643 implements MigrationInterface {
    name = 'addCreationDateForGithubToken1675344984643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "github_token" ADD "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "github_token" DROP COLUMN "createdDate"`);
    }

}
