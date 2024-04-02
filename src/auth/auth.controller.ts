import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 200,
    description: 'The bearer token is valid and user is authenticated',
  })
  @ApiResponse({
    status: 401,
    description:
      'Some error has occured. Either the jwt token or the public key is invalid.',
  })
  @Post('/')
  async loginOrSignup(@Body() body: CreateAuthDto, @Request() req) {
    return await this.authService.login(req.user);
  }
}
