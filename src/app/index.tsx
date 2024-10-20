import { css } from '@emotion/react';
import { Container, Card, Typography, IconButton, Button } from '@mui/material';
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import TaskList from '../components/TaskList';
import { ThemeProvider, useThemeContext } from './ThemeContext';
import TaskModal from '../components/CardCreation';
import { useState } from 'react';

const AppContent = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  const { darkMode, toggleDarkMode } = useThemeContext();

  const themeButtonStyle = css`
    position: absolute;
    top: 16px;
    right: 16px;
  `;

  const containerStyle = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    max-width: 600px;
    margin: 0 auto;
    padding: 0;
  `;

  const cardStyle = css`
    padding: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `;

  return (
    <div>
      <IconButton aria-label="toggle dark mode" onClick={toggleDarkMode} sx={themeButtonStyle}>
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Container sx={containerStyle}>
        <Card sx={cardStyle}>
          <Typography variant="subtitle1">Tosh's ToDo Lists</Typography>
          <IconButton aria-label="Add new task" onClick={handleOpen}>
            <Button variant="contained" color="primary">
              Add New Task
            </Button>
          </IconButton>
        </Card>
        <TaskList />
        <TaskModal mode="create" open={modalOpen} handleClose={handleClose} />
      </Container>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
