import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom } from 'src/custom-decorator';
import { AuthService } from './auth.service';
import { Public } from './decorators';
import { LoginDto, RefreshTokenDto } from './dto/create-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperationCustom('Login', 'post')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('cms/login')
  @ApiOperationCustom('Login', 'post')
  loginCMS(@Body() dto: LoginDto) {
    return this.authService.loginCMS(dto);
  }

  @Public()
  @Post('refresh-token')
  @ApiOperationCustom('Refresh token', 'post')
  refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }
}
