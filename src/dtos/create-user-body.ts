import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserBody {
  @IsNotEmpty({
    message: 'The name must not be empty',
  })
  name: string;

  @IsNotEmpty({
    message: 'The email must not be empty',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: `The password must not be empty`,
  })
  password: string;
}
