import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppConfigService } from '../config/app-config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly appConfigService: AppConfigService) {
    console.log('JWT Strategy Initialized', process.env.JWT_SECRET); // Debugging
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // The returned object will be attached to the request as req.user
    return { userId: payload.sub, username: payload.username };
  }
}
