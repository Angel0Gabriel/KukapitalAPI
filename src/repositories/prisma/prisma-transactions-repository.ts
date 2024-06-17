import { $Enums } from '@prisma/client';
import { TransactionsRepository } from '../transactions-repository';
import { PrismaService } from 'src/database/prisma.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class PrismaTransactionsRepository implements TransactionsRepository {
  constructor(private prisma: PrismaService) {}

  async createTransaction(
    userId: number,
    name: string,
    price: number,
    date: Date,
    type: $Enums.TransactionType,
  ): Promise<any> {
    try {
      return await this.prisma.transaction.create({
        data: {
          userId,
          name,
          price,
          date,
          type,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTransactions(): Promise<any> {
    try {
      return await this.prisma.transaction.findMany({
        orderBy: {
          id: 'asc',
        },
        include: {
          user: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTransactionById(id: number): Promise<any> {
    try {
      const transaction = await this.prisma.transaction.findUnique({
        where: {
          id,
        },
        include: {
          user: true,
        },
      });
      if (!transaction) {
        throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
      }
      return transaction;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateTransaction(
    id: number,
    name: string,
    price: number,
    date: Date,
    type: $Enums.TransactionType,
  ): Promise<any> {
    try {
      return await this.prisma.transaction.update({
        data: {
          name,
          price,
          date,
          type,
        },
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteTransaction(id: number): Promise<any> {
    try {
      return await this.prisma.transaction.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
