import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ name: 'email', description: 'Email', required: true })
  email: string;

  @IsString()
  @ApiProperty({ name: 'username', description: 'username', required: true })
  username: string;

  @IsString()
  @ApiProperty({ name: 'password', description: 'Mật khẩu', required: true })
  password: string;

  @IsString()
  @ApiProperty({ name: 'name', description: 'Họ và tên', required: true })
  name: string;

  @IsString()
  @ApiProperty({ name: 'phone', description: 'Số điện thoại người dùng', required: true })
  phone: string;

  @ApiProperty({ name: 'status', description: 'Trạng thái' })
  status?: string;
}
