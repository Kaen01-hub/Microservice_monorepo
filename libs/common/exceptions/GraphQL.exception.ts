import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Request, Response } from "express";
import { GraphQLError } from "graphql";

@Catch(GraphQLError)
export class GraphqlException implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log("going through this");
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
