import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { EmployeeService } from 'src/employee/employee.service';
import { EmployeeManagerService } from 'src/employeeManager/employeeManager.service';

@Injectable()
export class AuthGuard
  extends PassportAuthGuard('firebase-auth')
  implements CanActivate
{
  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private employeeManagerService: EmployeeManagerService,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if the endpoint is optional for authentication
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );
    const request: Request = context.switchToHttp().getRequest();
    const token = AuthGuard.extractTokenFromRequest(request);
    if (isPublic && !token) return true;

    await super.canActivate(context);

    const employee = await this.employeeService.findUser(
      (request.user as any).email,
    );
    const manager = await this.employeeManagerService.findOneByManagerId(
      employee.id,
    );
    if (!employee && !isPublic) {
      throw new HttpException('Invalid token', 401);
    }

    request.user = {
      ...employee,
      isManager: manager ? true : false,
      employeeManager: manager,
    };

    return true;
  }
  private static extractTokenFromRequest(req: Request): string | null {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7); // Extract the token part after 'Bearer '
    }
    return null;
  }
}
