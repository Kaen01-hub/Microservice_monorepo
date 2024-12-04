import { PrismaService } from "@app/db";
import { HttpStatus, Injectable } from "@nestjs/common";
import { NotFoundException } from "libs/common/exceptions/NotFoumdException";
import { TaskModel } from "./entities/task.entity";
import { CreateTaskInput } from "./dto/create-task.input";
import { BadRequestException } from "libs/common/exceptions/BadRequest.exception";

@Injectable()
export class TaskRepository {
  constructor(private prismaService: PrismaService) {

  }
  async create(createTaskInput: CreateTaskInput): Promise<TaskModel> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: createTaskInput.authorId
      }
    })

    if (!user) throw new NotFoundException('User is not exit');

    const task = await this.prismaService.task.create({
      data: {
        title: createTaskInput.title,
        content: createTaskInput.content,
        published: createTaskInput.published,
        authorId: createTaskInput.authorId,
      }
    })
    return task;
  }

  async findAll(): Promise<TaskModel[]> {
    const tasks = await this.prismaService.task.findMany();
    return tasks
  }

  async findOne(id: number): Promise<TaskModel> {
    const task = await this.prismaService.task.findFirst({
      where: {
        authorId: id
      }
    })
    return task
  }

  async findTaskUser(userId: number): Promise<TaskModel[]> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: userId
        }
      })

      if (!user) {
        throw new NotFoundException('User not found')
      }

      const taskOfUser = await this.prismaService.task.findMany({
        where: {
          authorId: user.id
        }
      })

      return taskOfUser;
    } catch (error) {
      throw new BadRequestException('find task not found')
    }
  }
}