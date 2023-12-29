import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@mui/material';
import axios from 'axios';
import EditTaskStatus from "./EditTaskStatus";
import { Box, FormControl, Input, InputAdornment, Typography, InputLabel , 
         Select, MenuItem, Button,  Snackbar, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TaskListStyle from "../../styles/TaskList.module.css";
import {
  useCurrentUser,
} from "../../contexts/CurrentUserContext";


function AllTasks( { message, filter = "" }) {
  const currentUser = useCurrentUser();
  const [editTask, setEditTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
  const [dropdownData, setDropdownData] = useState({
    priorities: [],
    categories: [],
    states: [],
    profiles: [],
    taskstatus: [],
  });
  const [notification, setNotification] = useState({ open: false, message: '', type: '' });
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let queryURL = `/tasks/?${filter}search=${query}`;
        if (selectedCategory) {
          queryURL += `&category=${selectedCategory}`; 
        }
        if (currentUser && currentUser.profile_id) {
          queryURL += `&assigned_to=${currentUser.profile_id}`;
        }
        const { data } = await axios.get(queryURL);
        setTasks(data.results || []);
      } catch (err) {
       console.error("Axios Error", err);
       console.error("Response Data", err.response?.data);
      }
    };
    const timer = setTimeout(() => {
      fetchTasks();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query , selectedCategory,currentUser ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prioritiesResponse, categoriesResponse, statesResponse, taskstatusResponse  ] = await Promise.all([
          axios.get("/priorities"),
          axios.get("/categories"),
          axios.get("/states"),
          axios.get("/taskstatus"),
        ]);

        setDropdownData({
          priorities: prioritiesResponse.data || [],
          categories: categoriesResponse.data || [],
          states: statesResponse.data || [],
          taskstatus : taskstatusResponse.data.results || [],

        });
      } catch (err) {
        console.error("Axios Error", err);
        console.error("Response Data", err.response?.data);
      }
    };
    fetchData();
  }, []);

  const getDropdownItemName = (id, dropdownItems) => {
    const item = dropdownItems.find((item) => item.id === id);
    return item ? item.name : '';
  };

  const getDropdownTaskState = (taskid, dropdownItems) => {
    const item = dropdownItems.find((item) => item.task === taskid);
    if ( item && item.state !== 'initial') {
      return getDropdownItemName(item.state, dropdownData.states);
    }
    return '';
  };

  const handleEditClick = (task) => {
    if (task) {
      setEditTask({ ...task });
      setIsModalOpen(true);
    } else {
      console.error('Task data is not available.');
    }
  };  

  const handleSaveEdit = async (editedTask) => {
    try {
      console.log("Editing task status:", editedTask);
      const updatedTaskStatus = {
        owner: editedTask.owner,  
        state: editedTask.state,      
        task: editedTask.id,  
        profile_id: editedTask.profile_id      
      };
    const taskStatusResponse = await axios.get(`/taskstatus?task=${editedTask.id}`);
    if (taskStatusResponse.data.results && taskStatusResponse.data.results.length > 0) {
      const taskStatusId = taskStatusResponse.data.results[0].id; 
      await axios.put(`/taskstatus/${taskStatusId}/`, updatedTaskStatus);
    } else {
      await axios.post(`/taskstatus/`, updatedTaskStatus);
    }
      setIsModalOpen(false);
      setNotification({ open: true, message: 'Task and its status updated successfully!', type: 'success' });
    } catch (error) {
      console.error("Error updating task and status:", error);
      setNotification({ open: true, message: 'Error updating task and status!', type: 'error' });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  return (
    <Box className={TaskListStyle.taskListRoot}>
    <Typography variant="h4" className={TaskListStyle.taskListTitle}>
      My Duty Tasks
    </Typography>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <FormControl variant="outlined" className={TaskListStyle.searchFormControl}>
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={TaskListStyle.searchInput}
          type="text"
          placeholder="Search tasks"
          aria-label="Search bar"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
    <div>
    <FormControl variant="outlined" className={TaskListStyle.dropdownFormControl}>
    <InputLabel id="category-label">Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dropdownData.categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
      {Array.isArray(tasks) && tasks.map((task) => (
        task && task.id ? (
          <Card>
          <CardContent>
           <Typography variant="h6" className={task.is_overdue ? TaskListStyle.overdueTask : ''}>
           {task.title}
           </Typography>
            <Typography variant="body1">Description: {task.description}</Typography>
            <Typography variant="body2">Due Date: {task.due_date}</Typography>
            <Typography variant="body2">Priority: {getDropdownItemName(task.priority, dropdownData.priorities)}</Typography>
            <Typography variant="body2">Category: {getDropdownItemName(task.category, dropdownData.categories)}</Typography>
            <Typography variant="body2">Status: {getDropdownTaskState(task.id, dropdownData.taskstatus)}</Typography>
            {getDropdownTaskState(task.id, dropdownData.taskstatus) !== 'Completed' && (
        <Button onClick={() => handleEditClick(task)} style={{ backgroundColor: 'blue', color: 'white' }}>
          Update Status
        </Button>
      )}
          </CardContent>
        </Card>
        ) : null
      ))}
      <EditTaskStatus
        open={isModalOpen}
        onClose={handleCloseModal}
        editTask={editTask}
        states={dropdownData.states}
        onSaveEdit={handleSaveEdit}
        setEditTask={setEditTask}
      />
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
  <Alert onClose={handleCloseNotification} severity={notification.type} sx={{ width: '100%' }}>
    {notification.message}
  </Alert>
</Snackbar>      
    </Box>
  );
};

export default AllTasks;
