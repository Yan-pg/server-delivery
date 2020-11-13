import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddAvatarFildToCategory1605204554656
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Categories',
      new TableColumn({
        name: 'categoryImage',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('Categories', 'ProductImage');
  }
}
