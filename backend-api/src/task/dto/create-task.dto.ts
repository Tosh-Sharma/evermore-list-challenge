import { ApiProperty } from '@nestjs/swagger';
import { TaskPriority, TaskState } from '@prisma/client';
import { IsNotEmpty, IsString, MinLength, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: TaskState;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  priority: TaskPriority;

  @ApiProperty()
  @IsNumber()
  list_id: number;
}
