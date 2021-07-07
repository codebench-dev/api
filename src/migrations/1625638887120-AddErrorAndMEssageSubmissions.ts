import {MigrationInterface, QueryRunner} from "typeorm";

export class AddErrorAndMEssageSubmissions1625638887120 implements MigrationInterface {
    name = 'AddErrorAndMEssageSubmissions1625638887120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ADD "message" character varying`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD "error" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "error"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "message"`);
    }

}
