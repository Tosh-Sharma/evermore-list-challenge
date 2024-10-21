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

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  mode: 'create' | 'edit';
  initialData?: {
    name: string;
    description: string;
    state: State;
    priority: Priority;
  };
}

const TaskModal = ({ open, handleClose, mode, initialData }: TaskModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState<State | ''>('');
  const [priority, setPriority] = useState<Priority | ''>('');

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setState(initialData.state);
      setPriority(initialData.priority);
    }
  }, [mode, initialData]);

  const handleSubmit = () => {
    console.log({ name, description, state, priority });
    handleClose();
  };

  const iconButtonStyle = (selected: boolean) => css`
    border: ${selected ? '2px solid #1976d2' : '2px solid rgba(0, 0, 0, 0.1)'};
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', margin: 'auto', width: 400, borderRadius: 2 }}>
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
            <MenuItem value={State.Canceled}>Canceled</MenuItem>
            <MenuItem value={State.Blocked}>Blocked</MenuItem>
            <MenuItem value={State.Done}>Done</MenuItem>
          </Select>
        </FormControl>
        <p>Priority</p>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 2 }}>
          <IconButton
            onClick={() => setPriority(Priority.Highest)}
            css={iconButtonStyle(priority === Priority.Highest)}
          >
            {priorityIcons.Highest}
          </IconButton>
          <IconButton
            onClick={() => setPriority(Priority.High)}
            css={iconButtonStyle(priority === Priority.High)}
          >
            {priorityIcons.High}
          </IconButton>
          <IconButton
            onClick={() => setPriority(Priority.Medium)}
            css={iconButtonStyle(priority === Priority.Medium)}
          >
            {priorityIcons.Medium}
          </IconButton>
          <IconButton
            onClick={() => setPriority(Priority.Low)}
            css={iconButtonStyle(priority === Priority.Low)}
          >
            {priorityIcons.Low}
          </IconButton>
          <IconButton
            onClick={() => setPriority(Priority.Lowest)}
            css={iconButtonStyle(priority === Priority.Lowest)}
          >
            {priorityIcons.Lowest}
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
