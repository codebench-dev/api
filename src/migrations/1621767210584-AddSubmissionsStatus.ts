import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSubmissionsStatus1621767210584 implements MigrationInterface {
    name = 'AddSubmissionsStatus1621767210584'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ADD "status" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD "output" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "output"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "status"`);
    }

}
