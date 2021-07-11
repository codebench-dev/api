import {MigrationInterface, QueryRunner} from "typeorm";

export class AddQualityAndLintScores1626038854102 implements MigrationInterface {
    name = 'AddQualityAndLintScores1626038854102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ADD "lintScore" integer`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD "qualityScore" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "qualityScore"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "lintScore"`);
    }

}
