import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStdErrStdOut1623077854175 implements MigrationInterface {
    name = 'AddStdErrStdOut1623077854175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "output"`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD "stdout" character varying`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD "stderr" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "stderr"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "stdout"`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD "output" character varying`);
    }

}
