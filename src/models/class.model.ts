import { BeforeCount, BeforeFind, BeforeSave, BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { EduLevelModel, LocationModel, SubjectModel, UserModel, addConditionNotDelete } from '.';
import { StatusClass } from 'src/constants';

@Table({
  tableName: 'Classes',
  timestamps: true,
})
export class ClassModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({
    type: DataType.INTEGER,
    comment: 'Trạng thái lớp',
    defaultValue: StatusClass.stillEmpty,
  })
  statusClass: number;

  @ForeignKey(() => SubjectModel)
  @Column({
    type: DataType.INTEGER,
  })
  subjectId: number;

  @BelongsTo(() => SubjectModel)
  subject: SubjectModel;

  @ForeignKey(() => EduLevelModel)
  @Column({
    type: DataType.INTEGER,
  })
  eduLevelId: number;

  @BelongsTo(() => EduLevelModel)
  eduLevel: EduLevelModel;

  @Column({
    type: DataType.STRING,
  })
  class: string;

  @ForeignKey(() => LocationModel)
  @Column({
    type: DataType.INTEGER,
  })
  locationId: number;

  @BelongsTo(() => LocationModel)
  location: LocationModel;

  @Column({
    type: DataType.STRING,
  })
  locationNear: string;

  @Column({
    type: DataType.STRING,
  })
  locationReal: string;

  @Column({
    type: DataType.STRING,
  })
  parentNumber: string;

  @Column({
    type: DataType.INTEGER,
  })
  price: number;

  @Column({
    type: DataType.SMALLINT,
  })
  numberSessions: number;

  @Column({
    type: DataType.INTEGER,
  })
  require: number;

  @Column({
    type: DataType.TEXT,
  })
  timeLearn: string;

  @Column({
    type: DataType.INTEGER,
  })
  genderStudent: number;

  @Column({
    type: DataType.TEXT,
    comment: 'Tình trạng hiện tại học viên',
  })
  studentStatus: string;

  @Column({
    type: DataType.TEXT,
    comment: 'Thông tin bổ sung',
  })
  moreInfoStudent: string;

  @Column({
    type: DataType.SMALLINT,
    comment: 'Thông tin bổ sung',
  })
  receivingFee: number;

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
  })
  userReceiverId: number;

  @BelongsTo(() => UserModel)
  userReceiver: UserModel;

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
