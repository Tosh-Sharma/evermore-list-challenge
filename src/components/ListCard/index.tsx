import React, { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card, CardContent, Typography, IconButton, Tooltip, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import { Priority, State } from '../../constants/constants';
import { useDeleteTask, useUpdateTask } from '../../hooks/task.hooks';
import { useThemeContext } from '../../app/ThemeContext';
import { priorityIcons } from '../PriorityIcons';
import TaskModal from '../CardCreation';
import ConfirmDeleteModal from './ConfirmDeleteModal';

interface ListCardProps {
  name: string;
  description: string;
  priority: Priority;
  state: State;
  id: number;
}

const ListCard: React.FC<ListCardProps> = ({ name, description, priority, state, id }) => {
  const { darkMode } = useThemeContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { mutate: deleteTask, isLoading: deleting } = useDeleteTask();
  const { mutate: updateTask, isLoading: updating } = useUpdateTask();

  const handleEditClick = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

  const getNextState = (currentState: State): State => {
    switch (currentState) {
      case 'TO_DO':
        return 'IN_PROGRESS' as State.InProgress;
      case 'IN_PROGRESS':
        return 'DONE' as State.Done;
      case 'DONE':
        return 'BLOCKED' as State.Blocked;
      case 'BLOCKED':
        return 'CANCELLED' as State.Cancelled;
      case 'CANCELLED':
        return 'TO_DO' as State.ToDo;
      default:
        return 'TO_DO' as State.ToDo;
    }
  };

  const handleStateTransition = () => {
    if (id) {
      const nextState = getNextState(state);
      updateTask({ id, updateTaskDto: { state: nextState } });
    }
  };

  if (deleting) {
    return 'Deleting...';
  }

  const cardContainerStyle = css`
    margin: 5px;
    padding: 5px;
    min-width: 150px;
    position: relative;
    box-shadow: ${darkMode
      ? '0px 4px 20px rgba(124, 124, 124, 0.1)'
      : '0px 4px 20px rgba(0, 0, 0, 0.1)'};
  `;

  const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;

  const Name = styled.div`
    display: flex;
    align-items: center;
  `;

  const State = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-left: 60px;
  `;

  const iconButtonStyle = css`
    border: 0.5px solid lightgrey;
    border-radius: 70%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-right: 15px;
  `;

  return (
    <Card sx={cardContainerStyle}>
      <CardContent>
        <Header>
          <Name>
            <Tooltip title={priority}>
              <IconButton aria-label="priority" sx={iconButtonStyle}>
                {priorityIcons[priority]}
              </IconButton>
            </Tooltip>
            <Typography variant="h5" component="div">
              {name}
            </Typography>
          </Name>
          <IconButton aria-label="edit" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </Header>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            paddingTop: 1,
            paddingLeft: 8,
          }}
        >
          {description}
        </Typography>
        <State>
          <Typography variant="body2" color="text.secondary">
            State
          </Typography>
          <Button variant="text" onClick={handleStateTransition}>
            {updating ? 'Updating...' : state}
          </Button>
        </State>
      </CardContent>
      <IconButton
        aria-label="delete"
        onClick={() => setDeleteModalOpen(true)}
        sx={css`
          position: absolute;
          bottom: 16px;
          right: 16px;
        `}
      >
        <DeleteIcon />
      </IconButton>
      <TaskModal
        mode="edit"
        open={modalOpen}
        handleClose={handleClose}
        initialData={{
          id,
          name,
          description,
          priority,
          state,
        }}
      />
      <ConfirmDeleteModal
        id={id}
        deleteTask={deleteTask}
        handleModalClose={handleDeleteModalClose}
        open={deleteModalOpen}
      />
    </Card>
  );
};

export default ListCard;
