/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  Dependencies,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository';

@Injectable()
@Dependencies(PrismaUsersRepository)
export class AuthService {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async signIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        password,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    const { password: _, ...result } = user;
    return result;
  }
}
