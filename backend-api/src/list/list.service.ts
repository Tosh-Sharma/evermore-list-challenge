import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateListDto) {
    await this.prisma.list.create({
      data: {
        name: createTaskDto.name,
      },
    });
  }

  async findAll() {
    return this.prisma.list.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.list.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async update(id: number, updateTaskDto: UpdateListDto) {
    const user = await this.prisma.list.update({
      where: {
        id,
      },
      data: {
        name: updateTaskDto.name,
      },
    });
    return user;
  }

  async remove(id: number) {
    const response = await this.prisma.list.delete({
      where: {
        id,
      },
    });
    return response;
  }
}
