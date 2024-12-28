import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUnaccentExtension1734811696041 implements MigrationInterface {
    name = 'AddUnaccentExtension1734811696041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" ALTER COLUMN "translations" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "example" ALTER COLUMN "translations" DROP NOT NULL`);
    }

}
