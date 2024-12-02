import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UserRepository } from "./user.repository";
import { User } from "@prisma/client";
import { GraphQLError } from "graphql";
import { HttpException } from "libs/common/exceptions/HttpException";
import { BadRequestException } from "libs/common/exceptions/BadRequest.exception";
import { NotFoundException } from "libs/common/exceptions/NotFoumdException";

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) { }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const userIsExit = await this.userRepo.findWithEmail(createUserInput.email);

    if (userIsExit) {
      throw new NotFoundException('User already exit!');
    }

    const newUser = await this.userRepo.create(createUserInput);

    if (!newUser) {
      throw new BadRequestException("User create fasle");
    }

    return newUser;
  }

  async findAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async findOne(id: number) {
    return this.userRepo.findWithId(id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
