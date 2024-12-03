import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UserModel } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UserService } from "./user.service";
import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";

@Resolver(() => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => UserModel)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [UserModel], { name: "getUsers" })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserModel, { name: "getUserWithId" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserModel)
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserModel)
  removeUser(@Args("id", { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
