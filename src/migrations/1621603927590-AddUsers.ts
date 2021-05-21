import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsers1621603927590 implements MigrationInterface {
    name = 'AddUsers1621603927590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "dataVersion" integer NOT NULL, "profilePicture" character varying NOT NULL, CONSTRAINT "UQ_772886e2f1f47b9ceb04a06e203" UNIQUE ("username", "email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
