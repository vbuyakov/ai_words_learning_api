import { MigrationInterface, QueryRunner } from "typeorm";

export class WordExampleTranslation1734808966652 implements MigrationInterface {
    name = 'WordExampleTranslation1734808966652'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" ADD "translations" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" DROP COLUMN "translations"`);
    }

}
