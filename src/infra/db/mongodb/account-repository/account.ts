import { type AddAccountRepository } from 'data/protocols/add-account-repository';
import { type AccountModel } from 'domain/models/account';
import { type AddAccountModel } from 'domain/usecases/add-account';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(accountData);
    const accountId = result.insertedId;
    const accountById = await accountCollection.findOne({
      _id: accountId,
    });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { _id, ...accountWithoutId } = accountById!;
    return Object.assign({}, accountWithoutId, {
      id: _id.toString(),
    }) as AccountModel;
  }
}
