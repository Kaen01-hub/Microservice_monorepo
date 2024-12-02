import { InputType, Int, Field, PartialType } from "@nestjs/graphql";
import { UserModel } from "../entities/user.entity";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserInput extends PartialType(UserModel) {
  @Field({ nullable: true })
  @IsNotEmpty()
  email?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  name?: string;
}
