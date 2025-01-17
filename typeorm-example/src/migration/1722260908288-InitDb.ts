import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1722260908288 implements MigrationInterface {
    name = 'InitDb1722260908288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" number GENERATED BY DEFAULT AS IDENTITY, "title" varchar2(255) NOT NULL, "content" varchar2(255) NOT NULL, "categoryId" number, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" number GENERATED BY DEFAULT AS IDENTITY, "name" varchar2(255) NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_1077d47e0112cad3c16bbcea6cd" FOREIGN KEY ("categoryId") REFERENCES "category" ("id")`);
        await queryRunner.query(`CREATE VIEW "post_view" AS 
    SELECT * FROM "post"
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, :1, DEFAULT, :2, :3, :4)`, ["DEMO","VIEW","post_view","SELECT * FROM \"post\""]);
        await queryRunner.query(`CREATE TABLE "configurable-table-query-result-cache" ("id" number GENERATED BY DEFAULT AS IDENTITY, "identifier" varchar2(255), "time" number NOT NULL, "duration" number NOT NULL, "query" clob NOT NULL, "result" clob NOT NULL, CONSTRAINT "PK_21a78ca157d92cebb96c8ff9f01" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "configurable-table-query-result-cache"`);
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = :1 AND "name" = :2`, ["VIEW","post_view"]);
        await queryRunner.query(`DROP VIEW "post_view"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_1077d47e0112cad3c16bbcea6cd"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
