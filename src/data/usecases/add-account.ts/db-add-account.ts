import { type Encrypter } from 'data/protocols/encrypter';
import { type AccountModel } from 'domain/models/account';
import { type AddAccount, type AddAccountModel } from 'domain/usecases/add-account';

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
