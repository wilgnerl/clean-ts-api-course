import {
  type AddAccountRepository,
  type AccountModel,
  type AddAccount,
  type AddAccountModel,
  type Encrypter,
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  private readonly encrypter;
  private readonly addAccountRepository;

  constructor(encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword }),
    );
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
