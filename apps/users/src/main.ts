import { NestFactory } from "@nestjs/core";
import { UserModule } from "./user.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // Removes properties not in the DTO
      forbidNonWhitelisted: true,  // Throws an error if unknown properties are sent
      transform: true        // Automatically transforms payloads to DTO instances
    }),
  );

  await app.listen(process.env.port ?? 3002);
}
bootstrap();
