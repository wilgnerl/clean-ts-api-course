import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, ok } from '../../helpers/http-helper';
import {
  type HttpRequest,
  type HttpResponse,
  type Controller,
  type EmailValidator,
} from '../../protocols';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;
    if (!email) {
      return badRequest(new MissingParamError('email'));
    }
    if (!password) {
      return badRequest(new MissingParamError('password'));
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const isValid = this.emailValidator.isValid(email);
    if (!isValid) {
      return badRequest(new InvalidParamError('email'));
    }

    return ok('');
  }
}
