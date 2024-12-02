import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { ApiGatewayModule } from "./api-gateway.module";
import { GraphqlException } from "libs/common/exceptions/GraphQL.exception";

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.useGlobalFilters(new GraphqlException());

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
