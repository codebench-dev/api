import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveProfilePicture1621611991821 implements MigrationInterface {
    name = 'RemoveProfilePicture1621611991821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profilePicture"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profilePicture" character varying NOT NULL`);
    }

}
