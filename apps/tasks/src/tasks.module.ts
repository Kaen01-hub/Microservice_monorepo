import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksResolver } from "./tasks.resolver";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import { DbModule } from "@app/db";
import { TaskRepository } from "./task.repository";


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
  providers: [TasksResolver, TasksService, TaskRepository],
})
export class TasksModule { }
