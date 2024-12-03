import { ObjectType, Field, Int } from '@nestjs/graphql';
import { EStatus } from './EStatus';

@ObjectType()
export class Task {
  @Field(() => Int, { description: "Example field (placeholder)" })
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => String) // Change to Date if necessary
  createdAt: Date;

  @Field()
  duration: string;

  @Field()
  status: EStatus;
}
