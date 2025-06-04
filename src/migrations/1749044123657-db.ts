import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1749044123657 implements MigrationInterface {
    name = 'Db1749044123657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_tbl" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleteAt" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL, "username" character varying(100) NOT NULL, "address" character varying(255) NOT NULL, "email" character varying(100) NOT NULL, "birthday" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_4f83c994072a8c4774158868464" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_tbl"`);
    }

}
