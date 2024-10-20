import { css } from '@emotion/react';
import { red, orange, yellow } from '@mui/material/colors';

export const IconPriority = {
  highest: css`
    color: ${red[500]}; /* Bright red */
  `,
  high: css`
    color: ${red[300]}; /* Slightly less bright red */
  `,
  medium: css`
    color: ${orange[500]}; /* Orange */
  `,
  low: css`
    color: ${yellow[700]}; /* Yellowish orange */
  `,
  lowest: css`
    color: ${yellow[300]}; /* Light yellowish orange */
  `,
};
