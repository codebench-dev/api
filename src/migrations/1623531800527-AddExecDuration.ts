import {MigrationInterface, QueryRunner} from "typeorm";

export class AddExecDuration1623531800527 implements MigrationInterface {
    name = 'AddExecDuration1623531800527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ADD "execDuration" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "execDuration"`);
    }

}
