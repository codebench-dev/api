import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSubmissionsLintReports1627337341637 implements MigrationInterface {
    name = 'AddSubmissionsLintReports1627337341637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ADD "lintErrors" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "lintErrors"`);
    }

}
