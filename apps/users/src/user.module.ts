import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { DbModule } from "@app/db";
import { UserRepository } from "./user.repository";
import { UserModel } from "./entities/user.entity";
import { TaskModel } from "apps/tasks/src/entities/task.entity";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },

    }),
    DbModule,
  ],
  providers: [UserResolver, UserService, UserRepository],
})
export class UserModule { }
