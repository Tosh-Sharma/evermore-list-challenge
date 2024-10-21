import React, { useEffect, useState } from 'react';
import {
  MenuItem,
  IconButton,
  Menu,
  Modal,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { FilterAlt, Sort } from '@mui/icons-material';

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

  const loadFilterChoices = () => {
    const savedFilters = localStorage.getItem('filterChoices');
    return savedFilters
      ? JSON.parse(savedFilters)
      : [State.ToDo, State.InProgress, State.Canceled, State.Blocked];
  };

  const saveFilterChoices = (choices: State[]) => {
    localStorage.setItem('filterChoices', JSON.stringify(choices));
  };

  const [sortMethod, setSortMethod] = useState(loadSortMethod());
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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

  const allTasksDone = 'All tasks are Done!';
  const filteredTasks = todoList.filter(
    (task) => selectedStates.length === 0 || selectedStates.includes(task.state)
  );

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
        <IconButton onClick={handleFilterIconClick}>
          <FilterAlt />
        </IconButton>
      </div>
      <Modal open={filterModalOpen} onClose={handleFilterModalClose}>
        <Box
          sx={{ p: 4, bgcolor: 'background.paper', margin: 'auto', width: 300, borderRadius: 2 }}
        >
          <h2>Filter by State</h2>
          {Object.values(State).map((state) => (
            <FormControlLabel
              key={state}
              control={
                <Checkbox
                  checked={selectedStates.includes(state)}
                  onChange={() => handleStateChange(state)}
                />
              }
              label={state}
            />
          ))}
          <Button variant="contained" color="primary" onClick={handleFilterModalClose}>
            Apply
          </Button>
        </Box>
      </Modal>
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
