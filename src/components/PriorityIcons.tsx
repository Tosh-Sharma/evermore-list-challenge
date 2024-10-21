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
  Lowest: <LowestPriority sx={IconPriority.lowest} />,
  Low: <LowPriority sx={IconPriority.low} />,
  Medium: <MediumPriority sx={IconPriority.medium} />,
  High: <HighPriority sx={IconPriority.high} />,
  Highest: <HighestPriority sx={IconPriority.highest} />,
};
