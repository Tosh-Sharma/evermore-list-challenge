import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [PrismaModule, TaskModule, ListModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
