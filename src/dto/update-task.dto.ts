import { Priority, State } from '../constants/constants';

export interface UpdateTaskDto {
  name?: string;
  description?: string;
  state?: State;
  priority?: Priority;
}
