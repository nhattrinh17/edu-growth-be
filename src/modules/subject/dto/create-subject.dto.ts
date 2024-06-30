import { ApiProperty } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({ name: 'name', type: String, description: 'Tên môn học' })
  name: string;

  @ApiProperty({ name: 'description', type: String, description: 'Mô tả' })
  description: string;
}
