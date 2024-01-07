import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helper';
import {
  type HttpResponse,
  type Authentication,
  type Controller,
  type EmailValidator,
  type HttpRequest,
} from './login-protocols';

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly authentication: Authentication;

  constructor(emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator;
    this.authentication = authentication;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { email, password } = httpRequest.body;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const accessToken = await this.authentication.auth(email, password);
      if (!accessToken) {
        return unauthorized();
      }

      return ok('');
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
