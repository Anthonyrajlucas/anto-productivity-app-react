import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';

const EditTaskStatus = ({ open, onClose, editTask, onSaveEdit, setEditTask, states }) => {
  const formControlStyle = { marginBottom: '15px' };

  const handleSaveClick = () => {
    onSaveEdit(editTask); 
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Update Task Status</Typography>
            <form>
              <Typography variant="body1" gutterBottom style={formControlStyle}>
                <strong>Title:</strong> {editTask?.title || ''}
              </Typography>
              <Typography variant="body1" gutterBottom style={formControlStyle}>
                <strong>Description:</strong> {editTask?.description || ''}
              </Typography>
              <FormControl fullWidth style={formControlStyle}>
                <InputLabel id="state-label">State</InputLabel>
                <Select
                  labelId="state-label"
                  id="state"
                  value={editTask?.state || ''}
                  onChange={(e) => setEditTask({ ...editTask, state: e.target.value })}
                >
                  {states.map((state) => (
                    <MenuItem key={state.id} value={state.id}>
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          </CardContent>
          <CardActions>
            <Button onClick={handleSaveClick} style={{ backgroundColor: 'green', color: 'white' }}>
              Save
            </Button>
            <Button onClick={onClose} style={{ backgroundColor: 'red', color: 'white' }}>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </div>
    </Modal>
  );
};

export default EditTaskStatus;
