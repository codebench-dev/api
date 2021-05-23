import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBenchmarkGitUrlNullable1621805244904 implements MigrationInterface {
    name = 'AddBenchmarkGitUrlNullable1621805244904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "benchmarks" DROP COLUMN "gitUrl"`);
        await queryRunner.query(`ALTER TABLE "benchmarks" ADD "gitUrl" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "benchmarks" DROP COLUMN "gitUrl"`);
        await queryRunner.query(`ALTER TABLE "benchmarks" ADD "gitUrl" character varying NOT NULL`);
    }

}
