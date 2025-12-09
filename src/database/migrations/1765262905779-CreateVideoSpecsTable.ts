import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateVideoSpecsTable1765262905779 implements MigrationInterface {
    name = 'CreateVideoSpecsTable1765262905779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`video_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`videoName\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`logo\` varchar(255) NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`video_specs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`length\` int NOT NULL, \`goal\` varchar(255) NOT NULL, \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
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
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_99d90c2a483d79f3b627fb1d5e9\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`brand_id\` \`brand_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`avatars\` DROP FOREIGN KEY \`FK_b22f4499b339d4362f86c87dfbe\``);
        await queryRunner.query(`ALTER TABLE \`avatars\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`avatars\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`avatars\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`hooks\` DROP FOREIGN KEY \`FK_9aa2df67df0c7fc6bd329d52048\``);
        await queryRunner.query(`ALTER TABLE \`hooks\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`hooks\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`hooks\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`brands\` ADD CONSTRAINT \`FK_2bd14c9ce10e19d290d3f6818d9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_99d90c2a483d79f3b627fb1d5e9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`avatars\` ADD CONSTRAINT \`FK_b22f4499b339d4362f86c87dfbe\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hooks\` ADD CONSTRAINT \`FK_9aa2df67df0c7fc6bd329d52048\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`video_specs\` ADD CONSTRAINT \`FK_fe4a418c7d14b17e184a9cd125f\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`video_specs\` DROP FOREIGN KEY \`FK_fe4a418c7d14b17e184a9cd125f\``);
        await queryRunner.query(`ALTER TABLE \`hooks\` DROP FOREIGN KEY \`FK_9aa2df67df0c7fc6bd329d52048\``);
        await queryRunner.query(`ALTER TABLE \`avatars\` DROP FOREIGN KEY \`FK_b22f4499b339d4362f86c87dfbe\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_1530a6f15d3c79d1b70be98f2be\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_99d90c2a483d79f3b627fb1d5e9\``);
        await queryRunner.query(`ALTER TABLE \`brands\` DROP FOREIGN KEY \`FK_2bd14c9ce10e19d290d3f6818d9\``);
        await queryRunner.query(`ALTER TABLE \`hooks\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`hooks\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`hooks\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`hooks\` ADD CONSTRAINT \`FK_9aa2df67df0c7fc6bd329d52048\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`avatars\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`avatars\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`avatars\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`avatars\` ADD CONSTRAINT \`FK_b22f4499b339d4362f86c87dfbe\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`brand_id\` \`brand_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_1530a6f15d3c79d1b70be98f2be\` FOREIGN KEY (\`brand_id\`) REFERENCES \`brands\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_99d90c2a483d79f3b627fb1d5e9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
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
        await queryRunner.query(`DROP TABLE \`video_specs\``);
        await queryRunner.query(`DROP TABLE \`video_type\``);
    }

}
