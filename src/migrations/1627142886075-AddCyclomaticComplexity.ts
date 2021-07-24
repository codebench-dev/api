import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCyclomaticComplexity1627142886075 implements MigrationInterface {
    name = 'AddCyclomaticComplexity1627142886075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ADD "cyclomaticComplexity" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "cyclomaticComplexity"`);
    }

}
