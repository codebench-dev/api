import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDuplicatedSubmission1626996924860 implements MigrationInterface {
    name = 'AddDuplicatedSubmission1626996924860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ADD "selfId" uuid`);
        await queryRunner.query(`ALTER TABLE "submissions" ADD CONSTRAINT "FK_8cc0cfc3583dbe9e530311136f6" FOREIGN KEY ("selfId") REFERENCES "submissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" DROP CONSTRAINT "FK_8cc0cfc3583dbe9e530311136f6"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "selfId"`);
    }

}
