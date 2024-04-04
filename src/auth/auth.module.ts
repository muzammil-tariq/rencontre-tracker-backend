import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from 'src/core/core.module';
import { Employee } from 'src/employee/entities/employee.entity';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { Provider } from './entities/provider.entity';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';

@Module({
  imports: [
    CoreModule,
    UtilsModule,
    TypeOrmModule.forFeature([Auth, Provider, Employee]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, AuthGuard, FirebaseAuthStrategy],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
