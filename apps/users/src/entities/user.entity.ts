import { ObjectType, Field, Int, PartialType } from "@nestjs/graphql";
import { User } from "@prisma/client";
import { Exclude } from "class-transformer";

@ObjectType()
export class UserModel implements User {
  @Field(() => Int, { description: "Example field (placeholder)" })
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;
}
