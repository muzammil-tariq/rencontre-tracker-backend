import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { EmployeeManagerService } from './employeeManager.service';
import { CreateEmployeeManagerDto } from './dto/create-employeeManager.dto';
import { LoginAsManagerDto } from './dto/login-asManager.dto';

@ApiBearerAuth()
@ApiTags('Employee Manager')
@Controller('employeeManager')
export class UserController {
  constructor(
    private readonly employeeManagerService: EmployeeManagerService,
    private readonly eventEmitter: EventEmitter2,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Manager Created successfully',
  })
  @Post('/')
  async create(
    @Request() req,
    @Body() createManagerDto: CreateEmployeeManagerDto,
  ) {
    return this.employeeManagerService.create(createManagerDto, req.user.id);
  }
  @Get('/')
  async getAllByHostId(@Request() req) {
    return this.employeeManagerService.findAllByHostId(req.user.id);
  }
  @Get('/hosts')
  async getAllHosts(@Request() req) {
    return this.employeeManagerService.getAllHosts(req.user.id);
  }
  @Post('/login')
  async loginAsManager(
    @Request() req,
    @Body() loginAsManagerDto: LoginAsManagerDto,
  ) {
    const hostId = loginAsManagerDto.hostId;
    return this.employeeManagerService.loginAsManager(hostId, 4);
  }
}
