import { HttpException } from "./HttpException";

export class UnauthorizedException extends HttpException {
  constructor(message: string, code?: string) {
    super(401, message || "Not Authorizied!!", "UNAUTHORIZED_ERROR");
  }
}
