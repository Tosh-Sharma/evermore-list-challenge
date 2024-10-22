import apiInstance from './axios';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../dto/task.dto';

class TaskApi {
  constructor() {}

  async createTask(createTaskDto: CreateTaskDto) {
    try {
      const response = await apiInstance.post(`task`, createTaskDto);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async getAllTasks() {
    try {
      const response = await apiInstance.get<Task[]>(`task`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async getTaskById(id: number) {
    try {
      const response = await apiInstance.get(`task/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task with id ${id}:`, error);
      throw error;
    }
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
    try {
      const response = await apiInstance.patch(`task/${id}`, updateTaskDto);
      return response.data;
    } catch (error) {
      console.error(`Error updating task with id ${id}:`, error);
      throw error;
    }
  }

  async deleteTask(id: number) {
    try {
      const response = await apiInstance.delete(`task/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting task with id ${id}:`, error);
      throw error;
    }
  }
}

export default TaskApi;
