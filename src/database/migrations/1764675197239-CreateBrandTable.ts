import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateBrandTable1764675197239 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create 'brands' table
    await queryRunner.createTable(
      new Table({
        name: 'brands',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'userId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'brandName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'int',
            default: 0,
          },
          {
            name: 'fileLogo',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
    );

    // Add foreign key to user table
    await queryRunner.createForeignKey(
      'brands',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user', // make sure your user table name is 'user'
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the 'brands' table
    await queryRunner.dropTable('brands');
  }
}
