/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { css } from '@emotion/react';
import { Priority, State } from '../../constants/constants';
import { priorityIcons } from '../PriorityIcons';
import { useCreateTask, useUpdateTask } from '../../hooks/task.hooks';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { UpdateTaskDto } from '../../dto/update-task.dto';

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  mode: 'create' | 'edit';
  initialData?: {
    id?: number;
    name: string;
    description: string;
    state: State;
    priority: Priority;
  };
}

const TaskModal = ({ open, handleClose, mode, initialData }: TaskModalProps) => {
  const buttonText = mode === 'create' ? 'Create' : 'Edit';
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState<State | ''>('');
  const [priority, setPriority] = useState<Priority | ''>('');
  const { mutate: createTask, isLoading: creating } = useCreateTask();
  const { mutate: updateTask, isLoading: updating } = useUpdateTask();

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setState(initialData.state);
      setPriority(initialData.priority);
    }
  }, [mode, initialData]);

  const handleSubmit = async () => {
    if (mode === 'create') {
      const newTask: CreateTaskDto = {
        name,
        description,
        state: state as State,
        priority: priority as Priority,
        list_id: 1, // Replace with actual list_id if needed
      };
      try {
        createTask(newTask);
        setName('');
        setDescription('');
        setState('');
        setPriority('');
        handleClose();
      } catch (error) {
        console.error('Error creating task:', error);
      }
    } else if (mode === 'edit' && initialData?.id) {
      const updatedTask: UpdateTaskDto = {
        name,
        description,
        state: state as State,
        priority: priority as Priority,
      };
      try {
        updateTask({ id: initialData.id, updateTaskDto: updatedTask });
        handleClose();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const iconButtonStyle = (selected: boolean) => css`
    border: ${selected ? '2px solid #1976d2' : '2px solid rgba(0, 0, 0, 0.1)'};
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          width: 400,
          borderRadius: 2,
          paddingTop: 2,
          marginTop: 10,
          justifyContent: 'center',
        }}
      >
        <h2>{mode === 'create' ? 'Create New Task' : 'Edit Task'}</h2>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="state-select">State</InputLabel>
          <Select
            labelId="state-select"
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value as State)}
          >
            <MenuItem value={State.ToDo}>To Do</MenuItem>
            <MenuItem value={State.InProgress}>In Progress</MenuItem>
            <MenuItem value={State.Cancelled}>Cancelled</MenuItem>
            <MenuItem value={State.Blocked}>Blocked</MenuItem>
            <MenuItem value={State.Done}>Done</MenuItem>
          </Select>
        </FormControl>
        <p>Priority</p>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
          <IconButton
            onClick={() => setPriority(Priority.HIGHEST)}
            css={iconButtonStyle(priority === Priority.HIGHEST)}
          >
            {priorityIcons.HIGHEST}
          </IconButton>
          <IconButton
            onClick={() => setPriority(Priority.HIGH)}
            css={iconButtonStyle(priority === Priority.HIGH)}
          >
            {priorityIcons.HIGH}
          </IconButton>
          <IconButton
            onClick={() => setPriority(Priority.MEDIUM)}
            css={iconButtonStyle(priority === Priority.MEDIUM)}
          >
            {priorityIcons.MEDIUM}
          </IconButton>
          <IconButton
            onClick={() => setPriority(Priority.LOW)}
            css={iconButtonStyle(priority === Priority.LOW)}
          >
            {priorityIcons.LOW}
          </IconButton>
          <IconButton
            onClick={() => setPriority(Priority.LOWEST)}
            css={iconButtonStyle(priority === Priority.LOWEST)}
          >
            {priorityIcons.LOWEST}
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={creating || updating || name.trim() === '' || priority === ''}
          >
            {creating || updating ? 'Submitting...' : `${buttonText}`}
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
