import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ConfirmDeleteModalProps {
  id: number;
  deleteTask: (id: number) => void;
  handleModalClose: () => void;
  open: boolean;
}

const modalStyle = {
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
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  id,
  deleteTask,
  handleModalClose,
  open,
}) => {
  const handleConfirm = () => {
    deleteTask(id);
    handleModalClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="confirm-delete-modal-title"
      aria-describedby="confirm-delete-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="confirm-delete-modal-title" variant="h6" component="h2">
          Confirm Delete
        </Typography>
        <Typography id="confirm-delete-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this task?
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
