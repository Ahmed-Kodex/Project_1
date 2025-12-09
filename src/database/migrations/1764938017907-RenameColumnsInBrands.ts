import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateBrandsTable1680000000006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add new columns only
    await queryRunner.addColumn(
      'brands',
      new TableColumn({
        name: 'description',
        type: 'text',
        isNullable: true,
      }),
    );

    await queryRunner.addColumns('brands', [
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP(0)',
      }),
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP(0)',
        onUpdate: 'CURRENT_TIMESTAMP(0)',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('brands', 'updatedAt');
    await queryRunner.dropColumn('brands', 'createdAt');
    await queryRunner.dropColumn('brands', 'description');
  }
}
