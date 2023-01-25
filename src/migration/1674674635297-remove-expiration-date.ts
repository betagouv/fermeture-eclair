import { MigrationInterface, QueryRunner } from "typeorm";

export class removeExpirationDate1674674635297 implements MigrationInterface {
    name = 'removeExpirationDate1674674635297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "github_token" DROP COLUMN "expirationDate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "github_token" ADD "expirationDate" date NOT NULL`);
    }

}
