import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSubmissionHashCode1626968543120 implements MigrationInterface {
    name = 'AddSubmissionHashCode1626968543120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ADD "codeHash" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "codeHash"`);
    }

}
