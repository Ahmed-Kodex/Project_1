import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductsTable1765260392633 implements MigrationInterface {
    name = 'CreateProductsTable1765260392633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`name\` varchar(255) NOT NULL, \`brand_id\` int NULL, \`description\` text NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`socialId\` \`socialId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`socialType\` \`socialType\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`otp\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`brands\` DROP FOREIGN KEY \`FK_2bd14c9ce10e19d290d3f6818d9\``);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`logo\` \`logo\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`video_type\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`video_type\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`avatars\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`avatars\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`hooks\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`hooks\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`video_specs\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`video_specs\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`brands\` ADD CONSTRAINT \`FK_2bd14c9ce10e19d290d3f6818d9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_99d90c2a483d79f3b627fb1d5e9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_99d90c2a483d79f3b627fb1d5e9\``);
        await queryRunner.query(`ALTER TABLE \`brands\` DROP FOREIGN KEY \`FK_2bd14c9ce10e19d290d3f6818d9\``);
        await queryRunner.query(`ALTER TABLE \`video_specs\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`video_specs\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`hooks\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`hooks\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`avatars\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`avatars\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`video_type\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`video_type\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`brands\` CHANGE \`logo\` \`logo\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`brands\` ADD CONSTRAINT \`FK_2bd14c9ce10e19d290d3f6818d9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`otp\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`socialType\` \`socialType\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`socialId\` \`socialId\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`products\``);
    }

}
