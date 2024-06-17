import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserBody } from './dtos/create-user-body';
import { UsersRepository } from './repositories/users-repository';
import { TransactionsRepository } from './repositories/transactions-repository';
import { CreateTransactionBody } from './dtos/create-transaction-body';
import { UpdateUserBody } from './dtos/update-user-body';
import { UpdateTransactionBody } from './dtos/update-transaction-body';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private usersRepository: UsersRepository,
    private transactionsRepository: TransactionsRepository,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getUsers() {
    return await this.usersRepository.getUsers();
  }

  @Get('users/:id')
  async getUsersById(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.usersRepository.getUserByID(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('users')
  async createUser(@Body() body: CreateUserBody) {
    const { name, email, password } = body;
    return await this.usersRepository.createUser(name, email, password);
  }

  @Patch('users/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserBody,
  ) {
    const { name, email } = body;
    return await this.usersRepository.updateUser(id, name, email);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersRepository.deleteUser(id);
  }

  @Get('transactions')
  async getTransaction() {
    return await this.transactionsRepository.getTransactions();
  }

  @Get('transactions/:id')
  async getTransactionsById(@Param('id', ParseIntPipe) id: number) {
    try {
      const transaction =
        await this.transactionsRepository.getTransactionById(id);
      if (!transaction) {
        throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
      }
      return transaction;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('transactions')
  async createTransaction(@Body() body: CreateTransactionBody) {
    const { userId, name, price, date, type } = body;
    return await this.transactionsRepository.createTransaction(
      userId,
      name,
      price,
      date,
      type,
    );
  }

  @Patch('transactions/:id')
  async updateTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTransactionBody,
  ) {
    const { name, price, date, type } = body;
    return await this.transactionsRepository.updateTransaction(
      id,
      name,
      price,
      date,
      type,
    );
  }

  @Delete('transactions/:id')
  async deleteTransaction(@Param('id', ParseIntPipe) id: number) {
    return await this.transactionsRepository.deleteTransaction(id);
  }
}
