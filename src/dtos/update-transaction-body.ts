import { TransactionType } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class UpdateTransactionBody {
  @IsNotEmpty({
    message: `The name must not be empty`,
  })
  name: string;

  @IsNotEmpty({
    message: `The price must not be empty`,
  })
  price: number;

  @IsNotEmpty({
    message: `The date must not be empty`,
  })
  date: Date;

  @IsNotEmpty({
    message: `The type must not be empty`,
  })
  type: TransactionType;
}
