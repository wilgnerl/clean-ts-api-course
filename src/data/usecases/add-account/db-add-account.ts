import {
  type AccountModel,
  type AddAccount,
  type AddAccountModel,
  type Encrypter,
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  private readonly encrypter;
  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return await new Promise((resolve) => {
      resolve({
        email: 'any_email@mail.com',
        id: 'any_id',
        name: 'any_name',
        password: 'any_password',
      });
    });
  }
}
