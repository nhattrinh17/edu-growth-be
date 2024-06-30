import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto, RefreshTokenDto } from './dto/create-auth.dto';
import { Helper } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { Status, TypeUser, messageResponse } from 'src/constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly helper: Helper, private readonly jwtService: JwtService, private readonly userService: UsersService) {}

  generateCode(length: number): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }
  //
  // async sendSmsConfirmByUserId(id: string) {
  //   const user = await this.userService.findOne({ where: { id }, attributes: ['id', 'confirmAccount', 'phone'] });
  //   if (!user) throw new HttpException('Id user invalid', HttpStatus.BAD_REQUEST);
  //   if (user.confirmAccount) throw new HttpException('The account has been verified', HttpStatus.BAD_REQUEST);
  //   // Check spam and send sms
  //   const checkSpam = await this.cacheService.get(`sendSms:${id}`);
  //   if (checkSpam) throw new HttpException('Do not repeat actions', HttpStatus.FORBIDDEN);
  //   const phoneNumber = `+84${user.phone}`;
  //   const code = this.generateCode(6);
  //   await Promise.all([this.smsTwilioService.sendVerificationCode(phoneNumber, code, 'verified_account', 60), this.cacheService.set(`sendSms:${id}`, code, 60)]);
  //   return {
  //     data: 'Send sms successfully',
  //   };
  // }

  // async confirmAccount(id: string, dto: ConfirmAccountDto) {
  //   const user = await this.userModel.findOne({ where: { id }, attributes: ['id', 'confirmAccount'] });
  //   if (!user) throw new HttpException('Id user invalid', HttpStatus.BAD_REQUEST);
  //   if (user.confirmAccount) throw new HttpException('The account has been verified', HttpStatus.BAD_REQUEST);
  //   const codeRedis = await this.cacheService.get(`sendSms:${id}`);
  //   if (!codeRedis) throw new HttpException('Code expired', HttpStatus.BAD_REQUEST);
  //   if (codeRedis !== dto.code) throw new HttpException('Code not valid', HttpStatus.BAD_REQUEST);
  //   user.confirmAccount = true;
  //   await user.save();
  //   return {
  //     data: 'Account verified successful',
  //   };
  // }

  generateAccessToken(payload: any, isRemember?: boolean) {
    return isRemember ? this.jwtService.signAsync(payload, { expiresIn: '365d' }) : this.jwtService.signAsync(payload);
  }

  generateRefreshToken(payload: any) {
    return this.jwtService.signAsync(payload, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: process.env.REFRESH_TOKEN_EXPIRE });
  }

  async login(dto: LoginDto) {
    let user = await this.userService.findOneByEmailOrUsername(dto.account);
    if (!user) {
      throw new HttpException(messageResponse.auth.userNotFound, HttpStatus.BAD_REQUEST);
    } else {
      if (user.status == Status.Inactive) throw new HttpException(messageResponse.auth.userHasBlocked, HttpStatus.BAD_REQUEST);
      const checkPass = await this.helper.verifyHash(user.password, dto.password);
      if (!checkPass) throw new HttpException(messageResponse.auth.password_wrong, HttpStatus.BAD_REQUEST);
    }
    const payloadAccessToken = {
      id: user.id,
      username: user.username,
      email: user.email,
      status: user.status,
      typeUser: user.typeUser,
    };
    return {
      access_token: await this.generateAccessToken(payloadAccessToken, Boolean(user.typeUser == TypeUser.Admin && dto.isRemember)),
      refresh_token: await this.generateRefreshToken({ id: user.id }),
    };
  }

  async loginCMS(dto: LoginDto) {
    let user = await this.userService.findOneByEmailOrUsername(dto.account);
    if (!user) {
      throw new HttpException(messageResponse.auth.userNotFound, HttpStatus.BAD_REQUEST);
    } else {
      if (user.typeUser != TypeUser.Admin) throw new HttpException(messageResponse.auth.cannot_access_cms, HttpStatus.BAD_REQUEST);
      if (user.status == Status.Inactive) throw new HttpException(messageResponse.auth.userHasBlocked, HttpStatus.BAD_REQUEST);
      const checkPass = await this.helper.verifyHash(user.password, dto.password);
      if (!checkPass) throw new HttpException(messageResponse.auth.password_wrong, HttpStatus.BAD_REQUEST);
    }
    const payloadAccessToken = {
      id: user.id,
      username: user.username,
      email: user.email,
      status: user.status,
      typeUser: user.typeUser,
    };
    return {
      access_token: await this.generateAccessToken(payloadAccessToken, Boolean(user.typeUser == TypeUser.Admin && dto.isRemember)),
      refresh_token: await this.generateRefreshToken({ id: user.id }),
    };
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload: {
        id: number;
      } = await this.jwtService.verifyAsync(dto.refresh_token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      const user = await this.userService.findOne(payload.id);
      const payloadAccessToken = {
        id: user.id,
        username: user.username,
        email: user.email,
        status: user.status,
      };
      return {
        access_token: await this.generateAccessToken(payloadAccessToken),
        refresh_token: await this.generateRefreshToken({ id: user.id }),
      };
    } catch (error) {
      throw new HttpException('refresh_token_error', HttpStatus.BAD_REQUEST);
    }
  }
}
