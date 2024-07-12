import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Gender } from 'src/constants';

export class CreateClassDto {
  @ApiProperty({ name: 'subjectId', type: Number, description: 'Id Môn học' })
  subjectId: number;

  @ApiProperty({ name: 'eduLevelId', type: Number, description: 'Id Cấp học' })
  eduLevelId: number;

  @ApiProperty({ name: 'class', type: String, description: 'Lớp học' })
  class: string;

  @ApiProperty({ name: 'image', type: String, description: 'Lớp học' })
  image: string;

  @ApiProperty({ name: 'locationId', type: Number, description: 'Id địa điểm' })
  locationId: number;

  @ApiProperty({ name: 'locationNear', type: String, description: 'Địa điểm hiển thị trên web' })
  locationNear: string;

  @ApiProperty({ name: 'locationReal', type: String, description: 'Địa điểm đúng của lớp' })
  locationReal: string;

  @ApiProperty({ name: 'parentNumber', type: String, description: 'Số điện thoại phụ huynh' })
  parentNumber: string;

  @ApiProperty({ name: 'price', type: Number, description: 'Số tiền trên buổi' })
  price: number;

  @ApiProperty({ name: 'numberSessions', type: Number, description: 'Số buổi trên tuần' })
  numberSessions: number;

  @ApiProperty({ name: 'require', type: Number, description: 'Yêu cầu đối với người dạy' })
  require: number;

  @ApiProperty({ name: 'timeLearn', type: String, description: 'Thời gian học' })
  timeLearn: string;

  @ApiProperty({ name: 'genderStudent', type: Number, description: 'Giới tính học sinh' })
  genderStudent: number;

  @ApiProperty({ name: 'studentStatus', type: String, description: 'Tình trạng hiện tại học sinh' })
  studentStatus: string;

  @ApiProperty({ name: 'moreInfoStudent', type: String, description: 'Thông tin bổ sung học sinh' })
  moreInfoStudent: string;

  @ApiProperty({ name: 'receivingFee', type: Number, description: 'Phí nhận lóp' })
  receivingFee: number;
}
