export const priorityOrder = {
  Highest: 5,
  High: 4,
  Medium: 3,
  Low: 2,
  Lowest: 1,
};

export enum Priority {
  Lowest = 'Lowest',
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Highest = 'Highest',
}

export enum State {
  ToDo = 'To-Do',
  InProgress = 'In Progress',
  Done = 'Done',
  Canceled = 'Canceled',
  Blocked = 'Blocked',
}
