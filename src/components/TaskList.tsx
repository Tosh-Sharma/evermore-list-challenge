import React from 'react';
import todoList from '../app/todoList';
import ListCard from './ListCard';

const TaskList: React.FC = () => {
  const allTasksDone = 'All tasks are Done!';
  return (
    <div>
      {todoList.length === 0 && <p>{allTasksDone}</p>}
      {todoList.map((task) => (
        <ListCard
          key={task.id}
          name={task.name}
          description={task.description}
          state={task.state}
          priority={task.priority}
        />
      ))}
    </div>
  );
};

export default TaskList;
