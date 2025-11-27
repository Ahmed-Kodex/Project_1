import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1764143293288 implements MigrationInterface {
    name = 'InitialMigration1764143293288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`otp\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`otp\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
    }

}
