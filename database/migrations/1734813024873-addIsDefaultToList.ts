import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsDefaultToList1734813024873 implements MigrationInterface {
    name = 'AddIsDefaultToList1734813024873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" ADD "is_default" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "list" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        

        await queryRunner.query(`
            INSERT INTO list (name, "is_archived", "created_at", "is_default" , "updated_at")
            VALUES ('Default', false, NOW(), true, NOW())
          `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "is_default"`);
    }

}
