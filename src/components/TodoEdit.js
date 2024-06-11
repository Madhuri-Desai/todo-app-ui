import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate,Link } from 'react-router-dom';
import { TextField, Button,Container, FormControl,MenuItem,Select,InputLabel} from '@mui/material';
import { getTodo, updateTodo } from '../services/ApiService';
import AddReminder from './AddReminder';

function TodoEdit() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const navigate = useNavigate();
  const [openReminderDialog,setOpenReminderDialog] = useState(false)

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await getTodo(id);
        setTodo(response.data);
      } catch (error) {
        console.error('Error fetching the todo item:', error);
      }
    };

    fetchTodo();
  }, [id]);

  const handleChange = (e) => {
    debugger
    const { name, value } = e.target;
    setTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTodo(id,todo);
      navigate('/');
    } catch (error) {
      console.error('Error updating the todo item:', error);
    }
  };

  const handleAddReminderClick = (taskId) => {
      setOpenReminderDialog(true);
  };

  const handleReminderDialogClose = () => {
    setOpenReminderDialog(false);
  };

  if (!todo) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Task</h2>
            <Button component={Link} to="/" variant="outlined" color="primary" sx={{position: 'relative',top:-6,right:420}}>
                Back
            </Button>
        <Container>
            <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                name ="title"
                value={todo.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                name="description"
                value={todo.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Due Date"
                type="date"
                value={todo.due_date}
                name="due-date"
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                    value={todo.priority}
                    name="priority"
                    onChange={handleChange}
                >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Recurring</InputLabel>
                <Select
                    value={todo.recurring}
                    name="recurring"
                    onChange={handleChange}
                >
                    <MenuItem value="None">None</MenuItem>
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="Custom">Custom</MenuItem>
                </Select>
            </FormControl>
            {todo.recurring === 'Custom' && (
                <TextField
                    label="Custom Interval (Days)"
                    type="number"
                    name="recurring_interval"
                    value={todo.recurringInterval}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
            )}
            <Button variant="contained" color="primary" style={{margin:20}} onClick={() =>handleAddReminderClick(id)}>
                Add Reminder
            </Button>
            <Button type="submit" variant="contained" color="primary">
                Save
            </Button>
            </form>
            <AddReminder
              open={openReminderDialog}
              handleClose={handleReminderDialogClose}
              taskId={id}
            />
        </Container>
    </div>
  );
}

export default TodoEdit;
