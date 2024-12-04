import { PrismaService } from "@app/db";
import { BadRequestException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { UserModel } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "@prisma/client";
import { TaskModel } from "apps/tasks/src/entities/task.entity";

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) { }

  async create(createUser: CreateUserInput): Promise<User> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: createUser.email,
          name: createUser.name,
          password: createUser.password
        },

      });

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<UserModel[]> {
    try {
      const users = await this.prismaService.user.findMany();
      const usersData: any = [];

      for (let user of users) {

        const tasks = await this.prismaService.task.findMany({
          where: {
            authorId: user.id
          }
        })
        usersData.push({ ...user, tasks: tasks })
      }

      return usersData;
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
        include: {
          tasks: true
        }
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

  async getTasks(id: number): Promise<TaskModel[]> {
    try {
      const tasks = await this.prismaService.task.findMany({
        where: {
          authorId: id
        }
      })
      return tasks
    } catch (error) {
      throw new BadRequestException('Get tasks had error')
    }
  }
}
