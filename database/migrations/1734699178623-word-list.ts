import { MigrationInterface, QueryRunner } from "typeorm";

export class WordList1734699178623 implements MigrationInterface {
    name = 'WordList1734699178623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "word" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "translation_english" character varying, "translation_russian" character varying, "examples" text array NOT NULL DEFAULT '{}', CONSTRAINT "PK_ad026d65e30f80b7056ca31f666" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "list" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "is_archived" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "word_lists_list" ("word_id" integer NOT NULL, "list_id" integer NOT NULL, CONSTRAINT "PK_d3b629f50b516ba2136cabb6ccf" PRIMARY KEY ("word_id", "list_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d025e1c75da20276e15676bb11" ON "word_lists_list" ("word_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d5df6f93fdec00add05e9b557" ON "word_lists_list" ("list_id") `);
        await queryRunner.query(`CREATE TABLE "list_users_user" ("list_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_bb6263609537d84b8b62ede8ffb" PRIMARY KEY ("list_id", "user_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_77f3ed38b53e2e5f3ec0e0d34d" ON "list_users_user" ("list_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9efddd610baa9d12e0c44e272d" ON "list_users_user" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "list_words_word" ("list_id" integer NOT NULL, "word_id" integer NOT NULL, CONSTRAINT "PK_778e2326bb1274a8aaf2e1fd8ba" PRIMARY KEY ("list_id", "word_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cd8a47edec28612236eb0ed459" ON "list_words_word" ("list_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3a1d468050cd6775c71ea9cd25" ON "list_words_word" ("word_id") `);
        await queryRunner.query(`ALTER TABLE "word_lists_list" ADD CONSTRAINT "FK_d025e1c75da20276e15676bb11a" FOREIGN KEY ("word_id") REFERENCES "word"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "word_lists_list" ADD CONSTRAINT "FK_9d5df6f93fdec00add05e9b5574" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "list_users_user" ADD CONSTRAINT "FK_77f3ed38b53e2e5f3ec0e0d34d2" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "list_users_user" ADD CONSTRAINT "FK_9efddd610baa9d12e0c44e272d8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "list_words_word" ADD CONSTRAINT "FK_cd8a47edec28612236eb0ed4595" FOREIGN KEY ("list_id") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "list_words_word" ADD CONSTRAINT "FK_3a1d468050cd6775c71ea9cd251" FOREIGN KEY ("word_id") REFERENCES "word"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list_words_word" DROP CONSTRAINT "FK_3a1d468050cd6775c71ea9cd251"`);
        await queryRunner.query(`ALTER TABLE "list_words_word" DROP CONSTRAINT "FK_cd8a47edec28612236eb0ed4595"`);
        await queryRunner.query(`ALTER TABLE "list_users_user" DROP CONSTRAINT "FK_9efddd610baa9d12e0c44e272d8"`);
        await queryRunner.query(`ALTER TABLE "list_users_user" DROP CONSTRAINT "FK_77f3ed38b53e2e5f3ec0e0d34d2"`);
        await queryRunner.query(`ALTER TABLE "word_lists_list" DROP CONSTRAINT "FK_9d5df6f93fdec00add05e9b5574"`);
        await queryRunner.query(`ALTER TABLE "word_lists_list" DROP CONSTRAINT "FK_d025e1c75da20276e15676bb11a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3a1d468050cd6775c71ea9cd25"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd8a47edec28612236eb0ed459"`);
        await queryRunner.query(`DROP TABLE "list_words_word"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9efddd610baa9d12e0c44e272d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_77f3ed38b53e2e5f3ec0e0d34d"`);
        await queryRunner.query(`DROP TABLE "list_users_user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d5df6f93fdec00add05e9b557"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d025e1c75da20276e15676bb11"`);
        await queryRunner.query(`DROP TABLE "word_lists_list"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`DROP TABLE "word"`);
    }

}
