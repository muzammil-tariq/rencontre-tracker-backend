import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CreateOrganizationDto } from './dto/create-meetingAgenda.dto';
import { OrganizationService } from './organization.service';

@ApiBearerAuth()
@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationController {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Organization created successfully',
  })
  @Post('/')
  async create(@Request() req, @Body() createUserDto: CreateOrganizationDto) {
    return await this.organizationService.create(createUserDto);
  }

  @Get('/')
  async findUser() {
    return await this.organizationService.findAll();
  }
}
