import { Priority, State } from '../constants/constants';

export interface Task {
  id: number;
  name: string;
  description: string;
  state: State;
  priority: Priority;
  list_id: number;
}
