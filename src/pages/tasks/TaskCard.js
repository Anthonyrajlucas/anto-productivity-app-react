import React, { } from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';

const TaskCard = ({ task, isOwner, onEditClick, onDeleteClick , priorities,states,categories, taskstatus, profiles}) => {
  const getDropdownItemName = (id, dropdownItems) => {
    if (!dropdownItems) return '';
    const item = dropdownItems.find((item) => item.id === id);
    return item ? item.name : '';
  };
  const getDropdownUserName = (id, dropdownItems) => {
    if (!dropdownItems) return  'Not Assigned';
    const item = dropdownItems.find((item) => item.id === id);
    return item ? item.username : 'Not Assigned';
  };
  const getDropdownTaskState = (taskid, dropdownItems) => {
    if (!dropdownItems) return 'Not updated';
    const item = dropdownItems.find((item) => item.task === taskid);
    if ( item && item.state !== 'initial') {
      return getDropdownItemName(item.state, states);
    }
    return 'Not updated';
  };


  return (
    <Card>
      <CardContent>
       <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body1">Description: {task.description}</Typography>
        <Typography variant="body2">Due Date: {task.due_date}</Typography>
        <Typography variant="body2">Priority: {getDropdownItemName(task.priority, priorities)}</Typography>
        <Typography variant="body2">Category: {getDropdownItemName(task.category, categories)}</Typography>
        <Typography variant="body2">Assigned To: {getDropdownUserName(task.assigned_to, profiles)}</Typography>        
        <Typography variant="body2">Status:{getDropdownTaskState(task.id, taskstatus )}</Typography>
         {isOwner && (
           <>
        <Button onClick={() => onEditClick(task)} style={{ backgroundColor: 'green', color: 'white' }}>
          Edit</Button>
        <Button onClick={() => onDeleteClick(task)} style={{ backgroundColor: 'red', color: 'white' }}>
          Delete</Button>
          </> ) }

      </CardContent>
    </Card>
  );
};

export default TaskCard;