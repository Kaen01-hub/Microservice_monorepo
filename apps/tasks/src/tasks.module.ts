import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksResolver } from "./tasks.resolver";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { DbModule } from "@app/db";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    DbModule,
  ],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
