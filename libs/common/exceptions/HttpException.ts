import { GraphQLError } from "graphql";

export class HttpException extends GraphQLError {
  status: number;

  constructor(status: number, message: string, code: string) {
    super(message, {
      extensions: {
        code: code || "INTERNAL_SERVER_ERROR",
        status: status,
      },
    });

    this.status = status;

    // Ensure no stacktrace leaks into the extensions
    Object.defineProperty(this, "stack", {
      value: undefined, // Remove stack trace
      writable: false,
    });
  }
}
