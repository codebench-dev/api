import {MigrationInterface, QueryRunner} from "typeorm";

export class LinkSubmissionsToBenchmark1622922117706 implements MigrationInterface {
    name = 'LinkSubmissionsToBenchmark1622922117706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ADD "benchmarkId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_7955266ebab72540a466f5c2d65" FOREIGN KEY ("benchmarkId") REFERENCES "benchmarks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_7955266ebab72540a466f5c2d65"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "benchmarkId"`);
    }

}
