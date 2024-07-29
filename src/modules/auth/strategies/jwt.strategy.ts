import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Status } from 'src/constants';
import { RedisService } from '../../cache/redis.service';
import { UsersService } from 'src/modules/users/users.service';

interface JwtPayload {
  email: string;
  id: number;
  tenantId: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findOne(payload.id);

    if (user && user.status !== Status.Active) return null;
    return {
      ...user,
    };
  }
}
