import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBenchMaxComplexity1627494323643 implements MigrationInterface {
    name = 'AddBenchMaxComplexity1627494323643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "benchmarks" ADD "maxCyclomaticComplexity" integer NOT NULL DEFAULT '10'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "benchmarks" DROP COLUMN "maxCyclomaticComplexity"`);
    }

}
