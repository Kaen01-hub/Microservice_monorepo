import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskModel } from './entities/task.entity';

@Resolver(() => TaskModel)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) { }

  @Mutation(() => TaskModel)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }

  @Query(() => [TaskModel], { name: 'tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Query(() => TaskModel, { name: 'task' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.findOne(id);
  }

  @Query(() => [TaskModel], { name: 'GetTaskUser' })
  findTaskUser(@Args('userId', { type: () => Int }) id: number) {
    return this.tasksService.findTaskUser(id);
  }


  @Mutation(() => TaskModel)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => TaskModel)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.tasksService.remove(id);
  }
}
