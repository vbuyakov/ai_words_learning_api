import { MigrationInterface, QueryRunner } from "typeorm";

export class WordTr1734703270901 implements MigrationInterface {
    name = 'WordTr1734703270901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "translation" ("id" SERIAL NOT NULL, "language" character varying NOT NULL, "text" character varying NOT NULL, "type" character varying, "word_id" integer, CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "example" ("id" SERIAL NOT NULL, "language" character varying NOT NULL, "sentence" character varying NOT NULL, "word_id" integer, CONSTRAINT "PK_608dd5fd6f0783062b07346ed1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "word" DROP COLUMN "translation_english"`);
        await queryRunner.query(`ALTER TABLE "word" DROP COLUMN "translation_russian"`);
        await queryRunner.query(`ALTER TABLE "word" DROP COLUMN "examples"`);
        await queryRunner.query(`ALTER TABLE "translation" ADD CONSTRAINT "FK_0bc6da6e04784c2b23651f67329" FOREIGN KEY ("word_id") REFERENCES "word"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "example" ADD CONSTRAINT "FK_5d8f8544ab25982511f7d1466a4" FOREIGN KEY ("word_id") REFERENCES "word"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" DROP CONSTRAINT "FK_5d8f8544ab25982511f7d1466a4"`);
        await queryRunner.query(`ALTER TABLE "translation" DROP CONSTRAINT "FK_0bc6da6e04784c2b23651f67329"`);
        await queryRunner.query(`ALTER TABLE "word" ADD "examples" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "word" ADD "translation_russian" character varying`);
        await queryRunner.query(`ALTER TABLE "word" ADD "translation_english" character varying`);
        await queryRunner.query(`DROP TABLE "example"`);
        await queryRunner.query(`DROP TABLE "translation"`);
    }

}
