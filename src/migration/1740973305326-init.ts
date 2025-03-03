import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1740973305326 implements MigrationInterface {
  name = 'Init1740973305326';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book" ("id" varchar PRIMARY KEY NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updateAt" datetime NOT NULL DEFAULT (datetime('now')), "deleteAt" datetime, CONSTRAINT "UQ_c10a44a29ef231062f22b1b7ac5" UNIQUE ("title"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updateAt" datetime NOT NULL DEFAULT (datetime('now')), "deleteAt" datetime, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "book"`);
  }
}
