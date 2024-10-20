import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card, CardContent, Typography, IconButton, Tooltip } from '@mui/material';
import {
  KeyboardArrowUp as HighPriority,
  KeyboardDoubleArrowUp as HighestPriority,
  DensityLarge as MediumPriority,
  KeyboardArrowDown as LowPriority,
  KeyboardDoubleArrowDown as LowestPriority,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

import { Priority, State } from '../../constants/constants';
import { IconPriority } from './css';
import { useThemeContext } from '../../app/ThemeContext';

interface ListCardProps {
  name: string;
  description: string;
  priority: Priority;
  state: State;
}

const priorityIcons = {
  Lowest: <LowestPriority sx={IconPriority.lowest} />,
  Low: <LowPriority sx={IconPriority.low} />,
  Medium: <MediumPriority sx={IconPriority.medium} />,
  High: <HighPriority sx={IconPriority.high} />,
  Highest: <HighestPriority sx={IconPriority.highest} />,
};

const ListCard: React.FC<ListCardProps> = ({ name, description, priority, state }) => {
  const { darkMode } = useThemeContext();

  const handleEditClick = () => {
    // Handle edit logic here
  };

  const handleDeleteClick = () => {
    // Handle delete logic here
  };

  const cardContainerStyle = css`
    margin: 16px;
    padding: 16px;
    min-width: 300px;
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

  return (
    <Card sx={cardContainerStyle}>
      <CardContent>
        <Header>
          <Name>
            <Tooltip title={priority}>
              <IconButton aria-label="priority">{priorityIcons[priority]}</IconButton>
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
        <Typography variant="body2" color="text.secondary">
          State: {state}
        </Typography>
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
    </Card>
  );
};

export default ListCard;
