import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import { UsersRepository } from './repositories/users-repository';
import { PrismaUsersRepository } from './repositories/prisma/prisma-users-repository';
import { TransactionsRepository } from './repositories/transactions-repository';
import { PrismaTransactionsRepository } from './repositories/prisma/prisma-transactions-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: TransactionsRepository,
      useClass: PrismaTransactionsRepository,
    },
  ],
})
export class AppModule {}
