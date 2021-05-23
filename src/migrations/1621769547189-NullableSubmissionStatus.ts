import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableSubmissionStatus1621769547189 implements MigrationInterface {
    name = 'NullableSubmissionStatus1621769547189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ALTER COLUMN "output" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "submissions" ALTER COLUMN "output" SET NOT NULL`);
    }

}
