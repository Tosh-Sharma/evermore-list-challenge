import { css } from '@emotion/react';
import { red, orange, yellow } from '@mui/material/colors';
import {
  KeyboardArrowUp as HighPriority,
  KeyboardDoubleArrowUp as HighestPriority,
  DensityLarge as MediumPriority,
  KeyboardArrowDown as LowPriority,
  KeyboardDoubleArrowDown as LowestPriority,
} from '@mui/icons-material';

const IconPriority = {
  highest: css`
    color: ${red[500]};
  `,
  high: css`
    color: ${red[300]};
  `,
  medium: css`
    color: ${orange[500]};
  `,
  low: css`
    color: ${yellow[700]};
  `,
  lowest: css`
    color: #b2a300;
  `,
};

export const priorityIcons = {
  LOWEST: <LowestPriority sx={IconPriority.lowest} />,
  LOW: <LowPriority sx={IconPriority.low} />,
  MEDIUM: <MediumPriority sx={IconPriority.medium} />,
  HIGH: <HighPriority sx={IconPriority.high} />,
  HIGHEST: <HighestPriority sx={IconPriority.highest} />,
};
