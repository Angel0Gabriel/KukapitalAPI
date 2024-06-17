import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from '../users-repository';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<any> {
    return await this.prisma.user.findMany({
      orderBy: {
        id: 'asc',
      },
      include: {
        transactions: true,
      },
    });
  }

  async getUserByID(id: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          transactions: true,
        },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: number, name: string, email: string): Promise<any> {
    return await this.prisma.user.update({
      data: {
        name,
        email,
      },
      where: { id },
    });
  }

  async deleteUser(id: number): Promise<any> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<any> {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
