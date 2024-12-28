import { MigrationInterface, QueryRunner } from "typeorm";

export class User1734689135355 implements MigrationInterface {
    name = 'User1734689135355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('NON_CONFIRMED', 'ACTIVE', 'BLOCKED')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "status" "public"."user_status_enum" NOT NULL DEFAULT 'NON_CONFIRMED', "confirmation_code" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "confirmed_at" TIMESTAMP, "blocked_at" TIMESTAMP, "blocking_note" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    }

}
