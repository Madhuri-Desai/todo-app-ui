import React, { useState } from 'react';
import { Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { addReminder } from '../services/ApiService';

const AddReminder = ({ open, handleClose, taskId }) => {
  const [remindAt, setRemindAt] = useState('');
  const [notificationMethod, setNotificationMethod] = useState('');

  const handleSubmit = () => {
    const reminder = { remind_at: remindAt, notification_method: notificationMethod };
    addReminder(taskId,reminder)
    .then(data => {
        console.log('Reminder created:', data);
        handleClose();
      });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Reminder</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Remind At"
          type="date"
          fullWidth
          variant="standard"
          value={remindAt}
          onChange={(e) => setRemindAt(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Notification Method"
          type="text"
          fullWidth
          variant="standard"
          value={notificationMethod}
          onChange={(e) => setNotificationMethod(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Reminder</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReminder;
