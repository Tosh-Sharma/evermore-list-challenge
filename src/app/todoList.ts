import { State, Priority } from '../constants/constants';

export default [
  {
    id: 1,
    name: 'Read a book',
    state: State.ToDo,
    priority: Priority.Low,
    description: 'Read a book about React',
  },
  {
    id: 2,
    name: 'Walk the dog',
    state: State.InProgress,
    priority: Priority.High,
    description: 'Take the dog for a walk in the park',
  },
  {
    id: 3,
    name: 'Go to Market',
    state: State.Done,
    priority: Priority.Medium,
    description: 'Buy some fruits and vegetables',
  },
  {
    id: 4,
    name: 'Learn Typescript',
    state: State.Blocked,
    priority: Priority.Highest,
    description: 'Learn Typescript for React',
  },
  {
    id: 5,
    name: 'Call Mom',
    state: State.ToDo,
    priority: Priority.High,
    description: 'Call Mom to check how she is doing',
  },
  {
    id: 6,
    name: 'Cook pasta',
    state: State.Canceled,
    priority: Priority.Low,
    description: 'Cook some pasta for lunch',
  },
];
