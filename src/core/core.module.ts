import { Module } from '@nestjs/common';

import { AwsService } from './aws-service/aws-service.service';

import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [UtilsModule],
  providers: [AwsService],
  exports: [AwsService],
})
export class CoreModule {}
