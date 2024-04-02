import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AwsService } from 'src/core/aws-service/aws-service.service';
import { GetDownloadUrlDto } from './common.dto';

@ApiTags('common')
@ApiBearerAuth()
@Controller('common')
export class CommonController {
  constructor(
    private readonly awsService: AwsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/signedUrl/:vault/:path*?')
  @ApiOperation({ summary: 'Get a signed URL for AWS S3' })
  @ApiResponse({
    status: 200,
    description: 'Signed URL generated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiParam({
    name: 'vault',
    enum: [
      'legal',
      'digital',
      'claim-property',
      'profile',
      'trusted_contacts',
      'future-messages',
      'messages-response',
    ],
    description: 'Vault type',
  })
  @ApiParam({
    name: 'path',
    type: String,
    description: 'File path',
    required: false,
  })
  @ApiQuery({
    name: 'contentType',
    required: true,
    type: String,
    description: 'Content type of the file',
  })
  async getSignedUrl(
    @Param('vault')
    vault:
      | 'legal'
      | 'digital'
      | 'claim-property'
      | 'profile'
      | 'trusted_contacts',
    @Param('path') path: string,
    @Query('contentType') contentType: string,
    @Req() req: any,
  ) {
    const bucketName = this.configService.get(
      ['trusted_contacts', 'profile'].includes(vault)
        ? 'AWS_S3_PUBLIC_BUCKET_NAME'
        : 'AWS_S3_BUCKET_NAME',
    );
    return await this.getAwsSignedUrl(
      vault,
      contentType,
      path,
      req.user.id,
      bucketName,
    );
  }
  async getAwsSignedUrl(
    vault: string,
    contentType: string,
    path: string,
    userId: string,
    bucketName: string,
  ) {
    const arr = path.split('/');
    const lastElement = arr.pop();
    arr.push(`${Date.now()}-` + lastElement);

    return await this.awsService.getUploadUrl(
      `${vault}/${userId}/${arr.join('/')}`,
      contentType,
      bucketName,
    );
  }

  @Post('/downloadUrl')
  @ApiOperation({ summary: 'Get a download URL for a file' })
  @ApiResponse({
    status: 200,
    description: 'Download URL generated successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    description: 'Request body containing the key for the file',
    type: GetDownloadUrlDto,
  }) // Assuming you have a DTO
  async getDownloadUrl(@Body() body: GetDownloadUrlDto) {
    const arr = body.key.split('/');

    const url = await this.awsService.getSignedUrl(arr[2], arr[1], arr[0]);
    return { url };
  }
}
