import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { VisitorService } from './visitor.service';

@ApiBearerAuth()
@ApiTags('Visitors')
@Controller('visitors')
export class VisitorController {
  constructor(
    private readonly visitorService: VisitorService,
    private readonly authService: AuthService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Visitor created successfully',
  })
  @Post('/')
  async create(@Request() req, @Body() createUserDto: CreateVisitorDto) {
    return await this.visitorService.create(createUserDto);
  }

  @Get('/')
  async findUser() {
    return await this.visitorService.findAll();
  }
}
