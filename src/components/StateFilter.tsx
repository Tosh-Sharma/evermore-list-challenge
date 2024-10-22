import { Modal, Box, FormControlLabel, Checkbox } from '@mui/material';
import { State } from '../constants/constants';

interface StateFilterProps {
  filterModalOpen: boolean;
  handleFilterModalClose: () => void;
  handleStateChange: (state: State) => void;
  selectedStates: State[];
}

const StateFilter = ({
  filterModalOpen,
  handleFilterModalClose,
  handleStateChange,
  selectedStates,
}: StateFilterProps) => {
  return (
    <Modal open={filterModalOpen} onClose={handleFilterModalClose}>
      <Box
        sx={{
          p: 4,
          bgcolor: 'background.paper',
          margin: 'auto',
          width: 300,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 10,
        }}
      >
        <h2>Filter by State</h2>
        {Object.values(State).map((state) => (
          <FormControlLabel
            key={state}
            control={
              <Checkbox
                checked={selectedStates.includes(state)}
                onChange={() => handleStateChange(state)}
              />
            }
            label={state}
          />
        ))}
      </Box>
    </Modal>
  );
};

export default StateFilter;
