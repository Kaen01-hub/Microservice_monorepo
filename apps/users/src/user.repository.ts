import { PrismaService } from "@app/db";
import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UserModel } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "@prisma/client";

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) { }

  async create(createUser: CreateUserInput): Promise<User> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: createUser.email,
          name: createUser.name,
        },
      });

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.prismaService.user.findMany();

      return users;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findWithId(id: number): Promise<User> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new NotFoundException("User not found");
      }

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findWithEmail(email: string): Promise<User> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          email: email
        }
      });
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
