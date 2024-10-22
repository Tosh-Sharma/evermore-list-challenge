import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const state = (() => {
      if (createTaskDto.state || createTaskDto.state.trim().length === 0)
        return 'TO_DO';
      return createTaskDto.state;
    })();
    const priority = (() => {
      if (createTaskDto.priority.trim().length === 0) return 'LOWEST';
      return createTaskDto.priority;
    })();
    await this.prisma.task.create({
      data: {
        name: createTaskDto.name,
        description: createTaskDto.description,
        state: state,
        priority: priority,
        list_id: createTaskDto.list_id || 1,
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const user = await this.prisma.task.update({
      where: {
        id,
      },
      data: {
        name: updateTaskDto.name,
        description: updateTaskDto.description,
        state: updateTaskDto.state,
        priority: updateTaskDto.priority,
      },
    });
    return user;
  }

  async remove(id: number) {
    const response = await this.prisma.task.delete({
      where: {
        id,
      },
    });
    return response;
  }
}
