import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetDownloadUrlDto {
  @ApiProperty({
    description:
      'Key of the file in the storage. Format: vault/userId/fileName,',
    example: 'message-vault/12345/sample-file.txt',
  })
  @IsNotEmpty()
  @IsString()
  key: string;
}
