import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppModule } from 'src/app.module';
import { UsersRepository } from 'src/repositories/users-repository';

@Module({
  imports: [AppModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [UsersRepository],
})
export class AuthModule {}
