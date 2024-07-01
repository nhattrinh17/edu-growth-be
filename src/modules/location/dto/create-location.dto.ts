import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ name: 'district', type: String, description: 'Huyện' })
  district: string;

  @ApiProperty({ name: 'province', type: String, description: 'Tỉnh' })
  province: string;
}
