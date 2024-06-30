import { BeforeCount, BeforeFind, BeforeSave, Column, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { addConditionNotDelete } from '.';

@Table({
  tableName: 'EduLevels',
  timestamps: true,
})
export class EduLevelModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  slug: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean;

  @Column({ type: DataType.DATE })
  deletedAt: Date;

  @BeforeFind
  @BeforeCount
  @BeforeSave
  static async BeforeFindHook(options: any) {
    addConditionNotDelete(options);
  }
}
