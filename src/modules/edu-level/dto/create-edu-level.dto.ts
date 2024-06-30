import { ApiProperty } from '@nestjs/swagger';

export class CreateEduLevelDto {
  @ApiProperty({ name: 'name', type: String, description: 'Tên cấp' })
  name: string;

  @ApiProperty({ name: 'description', type: String, description: 'Mô tả' })
  description: string;
}
