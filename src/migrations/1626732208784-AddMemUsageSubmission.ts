import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMemUsageSubmission1626732208784 implements MigrationInterface {
    name = 'AddMemUsageSubmission1626732208784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ADD "memUsage" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "memUsage"`);
    }

}
