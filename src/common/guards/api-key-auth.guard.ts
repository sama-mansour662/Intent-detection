import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '@common/decorators/public.decorator';

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const configuredSecret = this.configService.get<string>('auth.secretKey');
    if (!configuredSecret) {
      throw new UnauthorizedException('Internal secret key is not configured');
    }

    const request = context.switchToHttp().getRequest();
    const providedSecret = request.headers['x-internal-secret'];

    if (providedSecret !== configuredSecret) {
      throw new UnauthorizedException('Invalid internal secret key');
    }

    return true;
  }
}
