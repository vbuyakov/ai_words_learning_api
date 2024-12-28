import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    console.log('JWT AuthGuard Error:', err); // Debugging
    console.log('JWT AuthGuard Info:', info); // Debugging
    console.log('JWT AuthGuard User:', user); // Debugging
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
