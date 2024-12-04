import { InputType, Int, Field } from '@nestjs/graphql';
import { TaskModel } from '../entities/task.entity';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput implements Partial<TaskModel> {
  @Field(() => Number, { description: 'User Id' })
  @IsNotEmpty()
  @IsNumber()
  authorId?: number;

  @Field(() => String, { description: 'Title for the task' })
  @IsNotEmpty()
  @IsString()
  title?: string;

  @Field(() => String, { description: 'Content of task' })
  @IsNotEmpty()
  @IsString()
  content?: string;

  @Field({ description: 'Publish task defaut true', defaultValue: true })
  @IsNotEmpty()
  @IsBoolean()
  published?: boolean;
}
