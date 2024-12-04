import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskRepository } from './task.repository';
import { TaskModel } from './entities/task.entity';
import { BadRequestException } from 'libs/common/exceptions/BadRequest.exception';
import { NullableList } from '@nestjs/graphql';

@Injectable()
export class TasksService {
  constructor(private taskRepo: TaskRepository) { }

  async create(createTaskInput: CreateTaskInput): Promise<TaskModel> {
    const task = await this.taskRepo.create(createTaskInput);
    if (!task) throw new BadRequestException('Task create faile!!');

    return task
  }

  async findAll(): Promise<TaskModel[]> {
    const tasks = await this.taskRepo.findAll();
    return tasks;
  }

  async findTaskUser(userId: number): Promise<TaskModel[]> {
    const tasksOfUser = await this.taskRepo.findTaskUser(userId)

    return tasksOfUser;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
