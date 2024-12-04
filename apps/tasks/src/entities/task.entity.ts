import { Directive, Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Task } from "@prisma/client";  // Assuming Task is defined in Prisma

@ObjectType()
export class TaskModel implements Task {

  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  content: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  published: boolean;

  @Field({ nullable: true })
  authorId: number;

}