import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Query,
  Request,
  UnprocessableEntityException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { EmployeeService } from './employee.service';
import { Public } from 'src/auth/auth.decorator';

@ApiBearerAuth()
@ApiTags('Employees')
@Controller('employees')
export class UserController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly eventEmitter: EventEmitter2,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'The bearer token is valid and user is authenticated',
  })
  @ApiResponse({
    status: 401,
    description:
      'Some error has occured. Either the jwt token or the public key is invalid.',
  })
  @Get('/')
  @Public()
  async findOne(@Request() req) {
    const user = await this.employeeService.findUser(req?.user?.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'id', required: false, type: String })
  @Get('/user')
  async findUser(@Request() req, @Query('email') email, @Query('id') id) {
    // validate email
    if (!email && !id) {
      throw new UnprocessableEntityException('A valid email is required');
    } else if (email && id) {
      throw new UnprocessableEntityException(
        'Both email and id cannot be provided',
      );
    }

    let user, auth;
    if (id) {
      id = Number(id);
      auth = await this.authService.getById(id);
      user = await this.employeeService.findUser(auth.email);
    }
    if (email) {
      user = await this.employeeService.findUser(email);
      auth = await this.authService.getByEmail(email);
    }
    if (!user || !auth) {
      throw new NotFoundException('User not found');
    }
    return {
      id: auth.id,
      publicKey: auth.publicKey,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImage: user.profileImage,
    };
  }

  @Delete('/')
  async deleteUser(@Request() req) {
    await this.employeeService.remove(req.user.email);
  }
}
