import { Priority, State } from '../constants/constants';

export interface CreateTaskDto {
  name: string;
  description: string;
  state: State;
  priority: Priority;
  list_id: number;
}
