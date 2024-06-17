import { IsNotEmpty } from 'class-validator';

export class UpdateUserBody {
  @IsNotEmpty({
    message: `The name must not be empty`,
  })
  name: string;

  @IsNotEmpty({
    message: `The email must not be empty`,
  })
  email: string;
}
