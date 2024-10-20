import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card } from '@mui/material';

export const IconPriority = {
  highest: css`
    color: #ff0000; /* Bright red */
  `,
  high: css`
    color: #ff4d4d; /* Slightly less bright red */
  `,
  medium: css`
    color: #ffa500; /* Orange */
  `,
  low: css`
    color: #ffcc00; /* Yellowish orange */
  `,
  lowest: css`
    color: #ffeb99; /* Light yellowish orange */
  `,
};

export const CardContainer = styled(Card)`
  margin: 16px;
  padding: 16px;
`;
