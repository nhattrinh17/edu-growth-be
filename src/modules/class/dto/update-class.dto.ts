import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-class.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClassDto extends PartialType(CreateClassDto) {}

export class TutorReceiveClassDto {
  @ApiProperty({ name: 'email', type: String, description: 'Email liên hệ' })
  email: string;

  @ApiProperty({ name: 'name', type: String, description: 'Tên người nhận lớp' })
  name: string;

  @ApiProperty({ name: 'name', type: String, description: 'Tên người nhận lớp' })
  phone: string;
}
