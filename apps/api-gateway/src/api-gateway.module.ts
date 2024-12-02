import { HttpStatus, Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { IntrospectAndCompose } from "@apollo/gateway";
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {
              name: "users",
              url: "http://localhost:3002/graphql",
            },
            {
              name: "tasks",
              url: "http://localhost:3001/graphql",
            },
          ],
        }),
        validateSupergraph: true,
      },
      server: {
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        formatError(formattedError, error: any) {
          const graphQLFormattedError = {
            message: error?.extensions?.originalError?.message || error.extensions?.exception?.response?.message || error.message,
            code: error.extensions?.code || "SERVER_ERROR",
            name: error.extensions?.exception?.name || error.name,
          };
          console.log(error.extensions.originalError);


          return graphQLFormattedError;
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule { }
