import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSubmissionsDups1627032297690 implements MigrationInterface {
    name = 'AddSubmissionsDups1627032297690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "submissions_duplicates_submissions_submissions" ("submissionsId_1" uuid NOT NULL, "submissionsId_2" uuid NOT NULL, CONSTRAINT "PK_dc9ba678219f1f81163d50cfbc6" PRIMARY KEY ("submissionsId_1", "submissionsId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dc00f6d57c8d952e3a20a419e7" ON "submissions_duplicates_submissions_submissions" ("submissionsId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_c29525f4dac4489d8c36dd0ef9" ON "submissions_duplicates_submissions_submissions" ("submissionsId_2") `);
        await queryRunner.query(`ALTER TABLE "submissions" ADD "codeHash" character varying`);
        await queryRunner.query(`ALTER TABLE "submissions_duplicates_submissions_submissions" ADD CONSTRAINT "FK_dc00f6d57c8d952e3a20a419e7b" FOREIGN KEY ("submissionsId_1") REFERENCES "submissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "submissions_duplicates_submissions_submissions" ADD CONSTRAINT "FK_c29525f4dac4489d8c36dd0ef94" FOREIGN KEY ("submissionsId_2") REFERENCES "submissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions_duplicates_submissions_submissions" DROP CONSTRAINT "FK_c29525f4dac4489d8c36dd0ef94"`);
        await queryRunner.query(`ALTER TABLE "submissions_duplicates_submissions_submissions" DROP CONSTRAINT "FK_dc00f6d57c8d952e3a20a419e7b"`);
        await queryRunner.query(`ALTER TABLE "submissions" DROP COLUMN "codeHash"`);
        await queryRunner.query(`DROP INDEX "IDX_c29525f4dac4489d8c36dd0ef9"`);
        await queryRunner.query(`DROP INDEX "IDX_dc00f6d57c8d952e3a20a419e7"`);
        await queryRunner.query(`DROP TABLE "submissions_duplicates_submissions_submissions"`);
    }

}
