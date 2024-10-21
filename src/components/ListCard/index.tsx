import React, { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card, CardContent, Typography, IconButton, Tooltip, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

import { Priority, State } from '../../constants/constants';
import { useThemeContext } from '../../app/ThemeContext';
import { priorityIcons } from '../PriorityIcons';
import TaskModal from '../CardCreation';

interface ListCardProps {
  name: string;
  description: string;
  priority: Priority;
  state: State;
}

const ListCard: React.FC<ListCardProps> = ({ name, description, priority, state }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleEditClick = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const { darkMode } = useThemeContext();

  const handleDeleteClick = () => {
    // Handle delete logic here
  };

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
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <State>
          <Typography variant="body2" color="text.secondary">
            State
          </Typography>
          <Button variant="text">{state}</Button>
        </State>
      </CardContent>
      <IconButton
        aria-label="delete"
        onClick={handleDeleteClick}
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
          name,
          description,
          priority,
          state,
        }}
      />
    </Card>
  );
};

export default ListCard;
