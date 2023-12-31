import { EmailValidatorAdapter } from './email-validator';

describe('EmailValidator Adapter', () => {
  test('Should return false if validator return false', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('invalid_mail@mail.com');

    expect(isValid).toBe(false);
  });
});
