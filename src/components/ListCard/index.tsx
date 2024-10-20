import React from 'react';
import { CardContent, Typography, IconButton } from '@mui/material';
import {
  KeyboardArrowUp as HighPriority,
  KeyboardDoubleArrowUp as LowestPriority,
  HorizontalRule as MediumPriority,
  KeyboardArrowDown as LowPriority,
  KeyboardDoubleArrowDown as HighestPriority,
} from '@mui/icons-material';

import { Priority, State } from '../../constants/constants';
import { CardContainer, IconPriority } from './css';

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
  return (
    <CardContainer>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <IconButton aria-label="priority">{priorityIcons[priority]}</IconButton>
        <Typography variant="body2" color="text.secondary">
          State: {state}
        </Typography>
      </CardContent>
    </CardContainer>
  );
};

export default ListCard;
