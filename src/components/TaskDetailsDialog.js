import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const TaskDetailsDialog = ({ open, handleClose, task, handleMarkAsCancelled }) => {
  if (!task) return null;

  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={{display:'flex'}}>
        <DialogTitle>{task.title}</DialogTitle>
        <Button onClick={handleClose} style={{left:170}}>Close</Button>
      </div>
      <DialogContent>
        <Paper style={{height:200,width :300, padding:20,margin:20}}>
        <Typography variant="body1">
          <strong>Description:</strong> {task.description || 'No description'}
        </Typography>
        <Typography variant="body1">
          <strong>Due Date:</strong> {task.due_date}
        </Typography>
        <Typography variant="body1">
          <strong>Priority:</strong> {task.priority}
        </Typography>
        <Typography variant="body1">
          <strong>Status:</strong> {task.status}
        </Typography>
        <Typography variant="body1">
          <strong>Reminder:</strong> {task.reminder || 'No reminder set'}
        </Typography>
        <Typography variant="body1">
          <strong>Recurring:</strong> {task.recurring === 'None' ? 'No' : 'Yes'}
        </Typography>
        <Typography variant="body1">
          <strong>Recurring Interval:</strong> {task.recurring_interval ? task.recurring_interval : 'NA'}
        </Typography>
        </Paper>
        {task.status != 'Complete' ?
            <div style={{margin:30}}>
                <Button component={Link} to="/" variant="contained" color="primary" style={{margin:20}} onClick={handleMarkAsCancelled}>
                        Cancel The Task
                </Button>
                <Button component={Link} to={`/edit/${task.id}`} variant="contained" color="primary">
                        Edit Task
                </Button>
            </div> :<></>
        }
        </DialogContent>        
    </Dialog>
  );
};

export default TaskDetailsDialog;
