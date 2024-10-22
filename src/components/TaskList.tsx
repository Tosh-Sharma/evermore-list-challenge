import React, { useEffect, useState } from 'react';
import { MenuItem, IconButton, Menu } from '@mui/material';
import { FilterAlt, Sort } from '@mui/icons-material';
import { useGetAllTasks } from '../hooks/task.hooks';
import { Priority, priorityOrder, State } from '../constants/constants';
import ListCard from './ListCard';
import StateFilter from './StateFilter';

interface ITask {
  id: number;
  name: string;
  description: string;
  priority: Priority;
  state: State;
}

const TaskList: React.FC = () => {
  const { data: tasks, isLoading: loading, error } = useGetAllTasks();
  const loadSortMethod = () => {
    return localStorage.getItem('sortMethod') || 'priorityAsc';
  };

  const saveSortMethod = (method: string) => {
    localStorage.setItem('sortMethod', method);
  };

  const loadFilterChoices = () => {
    const savedFilters = localStorage.getItem('filterChoices');
    return savedFilters
      ? JSON.parse(savedFilters)
      : [State.ToDo, State.InProgress, State.Cancelled, State.Blocked];
  };

  const saveFilterChoices = (choices: State[]) => {
    localStorage.setItem('filterChoices', JSON.stringify(choices));
  };

  const [sortMethod, setSortMethod] = useState(loadSortMethod());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedStates, setSelectedStates] = useState<State[]>(loadFilterChoices());
  const open = Boolean(anchorEl);

  useEffect(() => {
    setSortMethod(loadSortMethod());
    setSelectedStates(loadFilterChoices());
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

  const handleFilterIconClick = () => {
    setFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };

  const handleStateChange = (state: State) => {
    setSelectedStates((prev) => {
      const newStates = prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state];
      saveFilterChoices(newStates);
      return newStates;
    });
  };

  if (loading) return <p>Loading tasks...</p>;

  const allTasksDone = 'All tasks are Done!';
  const filteredTasks = tasks?.filter((task) => {
    return selectedStates.length === 0 || selectedStates.includes(task.state);
  });

  if (filteredTasks?.length === 0) return <p>{allTasksDone}</p>;

  const sortTasks = (tasks: ITask[] | undefined) => {
    if (!tasks) return [];
    switch (sortMethod) {
      case 'priorityAsc':
        return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      case 'priorityDesc':
        return tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      case 'nameAsc':
        return tasks.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return tasks.sort((a, b) => b.name.localeCompare(a.name));
      case 'default':
        return tasks;
      default:
        return tasks;
    }
  };

  const sortedTasks = sortTasks(filteredTasks);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error loading tasks: {error.message}</p>;

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
          <MenuItem onClick={() => handleMenuItemClick('default')}>Default</MenuItem>
        </Menu>
        <IconButton onClick={handleFilterIconClick}>
          <FilterAlt />
        </IconButton>
      </div>
      <StateFilter
        filterModalOpen={filterModalOpen}
        handleFilterModalClose={handleFilterModalClose}
        handleStateChange={handleStateChange}
        selectedStates={selectedStates}
      />
      {sortedTasks.map((task) => (
        <ListCard
          key={task.id}
          id={task.id}
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
