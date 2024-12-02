import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
  constructor(message: string, code?: string) {
    super(404, message || "Not found!!", code || "UNAUTHORIZED_ERROR");
  }
}
