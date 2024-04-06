import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CoreModule } from 'src/core/core.module';
import { Visitor } from './entities/visitor.entity';
import { VisitorController } from './visitor.controller';
import { VisitorRepository } from './visitor.repository';
import { VisitorService } from './visitor.service';

@Module({
  imports: [CoreModule, AuthModule, TypeOrmModule.forFeature([Visitor])],
  controllers: [VisitorController],
  providers: [VisitorRepository, VisitorService],
  exports: [VisitorService],
})
export class VisitorModule {}
