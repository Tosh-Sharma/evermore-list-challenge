import React from 'react';
import todoList from '../app/todoList';
import ListCard from './ListCard';

const TaskList: React.FC = () => {
  return (
    <div>
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
