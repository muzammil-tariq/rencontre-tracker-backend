import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CoreModule } from 'src/core/core.module';
import { CommonController } from './common.controller';

@Module({
  imports: [AuthModule, CoreModule],
  controllers: [CommonController],
})
export class CommonModule {}
