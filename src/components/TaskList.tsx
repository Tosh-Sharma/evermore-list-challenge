import React, { useEffect, useState } from 'react';
import { MenuItem, IconButton, Menu } from '@mui/material';
import { Sort } from '@mui/icons-material';

import todoList from '../app/todoList';
import { Priority, priorityOrder, State } from '../constants/constants';
import ListCard from './ListCard';

interface ITask {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  state: State;
}

const TaskList: React.FC = () => {
  const loadSortMethod = () => {
    return localStorage.getItem('sortMethod') || 'priorityAsc';
  };

  const saveSortMethod = (method: string) => {
    localStorage.setItem('sortMethod', method);
  };

  const [sortMethod, setSortMethod] = useState(loadSortMethod());
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setSortMethod(loadSortMethod());
  }, []);

  const handleSortIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value: string) => {
    setSortMethod(value);
    saveSortMethod(value);
    setAnchorEl(null);
  };

  const allTasksDone = 'All tasks are Done!';
  const filteredTasks = todoList.filter((task) => task.state !== State.Done);

  if (filteredTasks.length === 0) return <p>{allTasksDone}</p>;

  const sortTasks = (tasks: ITask[]) => {
    switch (sortMethod) {
      case 'priorityAsc':
        return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      case 'priorityDesc':
        return tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      case 'nameAsc':
        return tasks.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return tasks.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return tasks;
    }
  };

  const sortedTasks = sortTasks(filteredTasks);

  return (
    <div>
      <div>
        <IconButton
          id="sort-button"
          aria-controls={open ? 'demo-positioned-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleSortIconClick}
        >
          <Sort />
        </IconButton>
        <Menu
          id="sort-button"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleSortMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={() => handleMenuItemClick('priorityAsc')}>Priority Ascending</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('priorityDesc')}>
            Priority Descending
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('nameAsc')}>Name Ascending</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('nameDesc')}>Name Descending</MenuItem>
        </Menu>
      </div>
      {sortedTasks.map((task) => (
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
