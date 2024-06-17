export abstract class UsersRepository {
  abstract createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<any>;

  abstract getUsers(): Promise<any>;

  abstract getUserByID(id: number): Promise<any>;

  abstract updateUser(id: number, name: string, email: string): Promise<any>;

  abstract deleteUser(id: number): Promise<any>;
}
