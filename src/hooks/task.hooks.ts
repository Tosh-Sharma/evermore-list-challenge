import { useQuery, useMutation, useQueryClient } from 'react-query';
import TaskApi from '../services/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../dto/task.dto';

const taskApi = new TaskApi();

export const useGetAllTasks = () => {
  return useQuery<Task[], Error>('tasks', taskApi.getAllTasks);
};

export const useGetTaskById = (id: number) => {
  return useQuery<Task, Error>(['task', id], () => taskApi.getTaskById(id));
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation((createTaskDto: CreateTaskDto) => taskApi.createTask(createTaskDto), {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, updateTaskDto }: { id: number; updateTaskDto: UpdateTaskDto }) =>
      taskApi.updateTask(id, updateTaskDto),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      },
    }
  );
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation((id: number) => taskApi.deleteTask(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks');
    },
  });
};
