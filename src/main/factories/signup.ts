import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';
import { SignupController } from '../../presentation/controllers/signup/signup';
import { type Controller } from '../../presentation/protocols';
import { LogControllerDecorator } from '../decorators/log';
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log';

export const makeSignupController = (): Controller => {
  const salt = 12;
  const emailValidatorAdapter = new EmailValidatorAdapter();
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository);
  const controller = new SignupController(emailValidatorAdapter, dbAddAccount);
  const logErrorRepository = new LogMongoRepository();

  return new LogControllerDecorator(controller, logErrorRepository);
};
