import React, { useState } from 'react'
import { TextField,Button, Container,FormControl,MenuItem,Select,InputLabel } from '@mui/material';
import { createTodo, updateTodo } from '../services/ApiService';
import { useNavigate, Link} from 'react-router-dom';

const AddTodo = ({ todo, onSave }) => {
  
  const [title, setTitle] = useState(todo ? todo.title : '');
  const [description, setDescription] = useState(todo ? todo.description : '');
  const [dueDate, setDueDate] = useState(todo ? new Date(todo.due_date).toISOString() : '');
  const [priority, setPriority] = useState(todo ? todo.priority : '');
  const [recurring, setRecurring] = useState(todo ? todo.recurring : '');
  const [recurringInterval, setRecurringInterval] = useState(todo ? todo.recurring_interval : 1);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    debugger
      e.preventDefault();
      const todoData = {
          title,
          description,
          due_date: dueDate,
          priority,
          recurring,
          recurring_interval: recurring === 'Custom' ? recurringInterval : null,
      };
      if (todo) {
          updateTodo(todo.id, todoData).then(navigate('/'));
      } else {
          createTodo(todoData).then(navigate('/'));
      }
  };

  return (
    <div>
        <h2>Add New Task</h2>
        <Button component={Link} to="/" variant="outlined" color="primary" sx={{position: 'relative',top:-6,right:380}}>
                Back
        </Button>
      <Container>
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Due Date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Recurring</InputLabel>
                <Select
                    value={recurring}
                    onChange={(e) => setRecurring(e.target.value)}
                >
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="Custom">Custom</MenuItem>
                </Select>
            </FormControl>
            {recurring === 'Custom' && (
                <TextField
                    label="Custom Interval (Days)"
                    type="number"
                    value={recurringInterval}
                    onChange={(e) => setRecurringInterval(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            )}
            <Button type="submit" variant="contained" color="primary">
                Save
            </Button>
        </form>
      </Container>
    </div>
  )
}

export default AddTodo;
