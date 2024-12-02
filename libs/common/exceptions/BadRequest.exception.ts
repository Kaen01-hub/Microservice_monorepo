import { HttpStatus } from "@nestjs/common";
import { HttpException } from "./HttpException";

export class BadRequestException extends HttpException {
  constructor(message: string, code?: string) {
    super(HttpStatus.BAD_REQUEST, message || "Bad request!!", "BAD_REQUEST");
  }
}
