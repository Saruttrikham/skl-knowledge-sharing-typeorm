import { MigrationInterface, QueryRunner } from "typeorm";

export class PostView1722248790175 implements MigrationInterface {
    name = 'PostView1722248790175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE VIEW "post_view" AS 
    SELECT * FROM "post"
  `);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("database", "schema", "table", "type", "name", "value") VALUES (DEFAULT, :1, DEFAULT, :2, :3, :4)`, ["DEMO","VIEW","post_view","SELECT * FROM \"post\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = :1 AND "name" = :2`, ["VIEW","post_view"]);
        await queryRunner.query(`DROP VIEW "post_view"`);
    }

}
