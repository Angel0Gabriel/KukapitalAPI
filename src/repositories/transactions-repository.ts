import { TransactionType } from '@prisma/client';

export abstract class TransactionsRepository {
  abstract createTransaction(
    userId: number,
    name: string,
    price: number,
    date: Date,
    type: TransactionType,
  ): Promise<any>;

  abstract getTransactions(): Promise<any>;

  abstract getTransactionById(id: number): Promise<any>;

  abstract updateTransaction(
    id: number,
    name: string,
    price: number,
    date: Date,
    type: TransactionType,
  ): Promise<any>;

  abstract deleteTransaction(id: number): Promise<any>;
}
