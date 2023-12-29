import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const EditTaskModal = ({ open, onClose, editTask, onSaveEdit, setEditTask, priorities, categories, users }) => {
  const inputStyle = { marginBottom: '15px' };

  const handleSaveClick = () => {
    onSaveEdit(editTask); 
  };
  
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Card>
          <CardContent>
            <Typography variant="h6">Edit Task</Typography>
            <form>
              <TextField
                style={inputStyle}
                label="Title"
                variant="outlined"
                value={editTask?.title || ''}
                fullWidth
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
              />

              <TextField
                style={inputStyle}
                label="Description"
                variant="outlined"
                value={editTask?.description || ''}
                fullWidth
                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
              />

              <TextField
                style={inputStyle}
                label="Due Date"
                variant="outlined"
                value={editTask?.due_date || ''}
                fullWidth
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setEditTask({ ...editTask, due_date: e.target.value })}
              />

              <FormControl fullWidth style={inputStyle}>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Select
                  labelId="priority-label"
                  id="priority"
                  value={editTask?.priority || ''}
                  onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
                >
                  {priorities && priorities.map((priority) => (
                    <MenuItem key={priority.id} value={priority.id}>
                      {priority.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth style={inputStyle}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={editTask?.category || ''}
                  onChange={(e) => setEditTask({ ...editTask, category: e.target.value })}
                >
                  {categories && categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth style={inputStyle}>
                <InputLabel id="assigned-to-label">Assigned To</InputLabel>
                <Select
                  labelId="assigned-to-label"
                  id="assigned-to"
                  value={editTask?.assigned_to || ''}
                  onChange={(e) => setEditTask({ ...editTask, assigned_to: e.target.value })}
                >
                  {users && users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.username}
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

export default EditTaskModal;
