import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBenchmarks1621724651623 implements MigrationInterface {
    name = 'AddBenchmarks1621724651623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "benchmarks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "subject" character varying NOT NULL, "gitUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "difficulty" character varying NOT NULL, "creatorId" uuid, CONSTRAINT "PK_7e1ca1c910680770da116e0b95c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "benchmarks" ADD CONSTRAINT "FK_f7dfba1f69546feced443cd097c" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "benchmarks" DROP CONSTRAINT "FK_f7dfba1f69546feced443cd097c"`);
        await queryRunner.query(`DROP TABLE "benchmarks"`);
    }

}
