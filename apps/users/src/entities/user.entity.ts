import { ObjectType, Field, Directive, ID } from '@nestjs/graphql';
import { TaskModel } from 'apps/tasks/src/entities/task.entity';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  password: string;

}

