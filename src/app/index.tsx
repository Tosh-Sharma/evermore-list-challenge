import { Container, Card, Typography, IconButton } from '@mui/material';
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@mui/icons-material';
import TaskList from '../components/TaskList';
import { ThemeProvider, useThemeContext } from './ThemeContext';

const AppContent = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();

  return (
    <div>
      <IconButton
        aria-label="toggle dark mode"
        onClick={toggleDarkMode}
        sx={{ position: 'absolute', top: 16, right: 16 }}
      >
        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      <Container
        maxWidth="sm"
        disableGutters
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Card sx={{ p: 4 }}>
          <Typography variant="subtitle2">Tosh's ToDo Lists</Typography>
        </Card>
        <TaskList />
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
