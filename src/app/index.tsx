import { Container, Card, CssBaseline, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import TaskList from '../components/TaskList';

function App() {
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="sm"
        disableGutters
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Card sx={{ p: 4 }}>
          <Typography variant="subtitle2">Tosh's ToDo Lists</Typography>
        </Card>
        <TaskList />
      </Container>
    </>
  );
}

export default App;
