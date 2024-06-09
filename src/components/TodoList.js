import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTodos, deleteTodo, updateTodoStatus,updateTodoCancellation} from '../services/ApiService';
import { List, ListItem, ListItemText, IconButton, Button,Box,Divider,Typography ,Dialog,DialogContent} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import TaskDetailsDialog from './TaskDetailsDialog';
import moment from "moment";
import { CheckOutlined } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    box_style: {
        maxHeight: "185px",
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",    
        maxWidth: "100%",
      },
      list_root: {
        width: "100%",
        alignContent: "stretch",
      },
      color_primary: {
        color: "black",
        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
        textOverflow: "ellipsis",
        maxWidth: "200px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        marginTop: "10px",
      },
}))

const TodoList = () => {

    const classes = useStyles();

    const [todos, setTodos] = useState([]);

    const navigate = useNavigate();

    const [selectedTask, setSelectedTask] = useState(null);
    const [taskDetailsDialogOpen, setTaskDetailsDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedTaskId,setSelectedTaskId] = useState(0);

    const quotes = [
        '" IT TAKES GOOD EFFORT TO BEGIN AND A GREAT EFFORT TO COMPLETE A TASK. "',
        '" IT ALWAYS SEEMS IMPOSSIBLE UNTIL ITS DONE. "',
        '" BETTER TO COMPLETE A SMALL TASK THAN TO DO MUCH IMPERFECTLY. "',
        '" ONCE BEGUN, A TASK IS EASY; HALF THE WORK IS DONE. "',
        '" DONE IS BETTER THAN PERFECT. "',
      ];
    
    function getQuotes() {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }


    useEffect(() => {
        fetchTodos();
    }, []);
    
    const fetchTodos = async () => {
        const response = await getTodos();
        if(response.data){
            setTodos(response.data);
        }else{
            setTodos([])
        }        
    };

    function formatDate(data) {
        

    }

    
    const handleDelete = async () => {
        await deleteTodo(selectedTaskId);        
        navigate('/');
    };

    const handleRowClick = (task) => {
        setSelectedTask(task);
        setTaskDetailsDialogOpen(true);
      };
    
      const handleTaskDetailsDialogClose = () => {
        setTaskDetailsDialogOpen(false);
        setSelectedTask(null);
      };
    
    const handleMarkAsComplete = (id) =>{
        const todoData = {
            status:'Complete'
        };
        setSelectedTask(null);
        updateTodoStatus(id, todoData).then(navigate('/'));
    }

    const handleMarkAsCancelled = () =>{
        const todoData = {
            cancelled:true
        };
        setTaskDetailsDialogOpen(false);
        setSelectedTask(null);
        updateTodoCancellation(selectedTask.id, todoData).then(navigate('/'));
    }
    
    const handleDeleteDialogClose = () =>{
        setDeleteDialogOpen(false)
        setSelectedTaskId(0)
    }

    const handleDeleteDialogOpen = (id) =>{
        setSelectedTaskId(id)
        setDeleteDialogOpen(true)
    }

    const handleDeleteClick =()=>{
        handleDelete()
        setDeleteDialogOpen(false)
        setSelectedTaskId(0)
    }

    function handleDeleteDialog(){
        return(
            <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
                <DialogContent>
                    <Typography>Selected Task will be Deleted. Please confirm</Typography>
                    <div style={{margin:30}}>
                        <Button onClick={handleDeleteDialogClose} style={{left:170}}>Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleDeleteClick}>
                                Delete
                        </Button>
                    </div>
                </DialogContent>
                
            </Dialog>
        )
    }

    return (
        <div>
            <h2>Todo List</h2>
            <Button component={Link} to="/new" variant="outlined" color="primary" sx={{position: 'relative',top:-6,right: -10,left:'140px'}}>
                Add Task
            </Button>
            <Box sx={{
                    width: '100%',
                    maxWidth: 400,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                    maxHeight: 400,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    padding: 2,
                    boxShadow: 3,
                }}
            >
                { todos && todos.length ?
                <List className={classes.list_root}>
                    {todos.map(todo => (
                        <div>
                            <div style={{display:'flex'}}>
                            <ListItem key={todo.id} divider button onClick={() => handleRowClick(todo)}>
                            <ListItemText 
                                primary={<Typography
                                    sx={{ display: "inline" }}
                                    variant="body2"
                                    className={classes.color_primary}
                                >{todo.title}</Typography>} 
                                secondary={todo.due_date} />
                            </ListItem>
                            { todo.status != 'Complete' && todo.cancelled == false ?
                             <div>
                                <IconButton edge="end" aria-label="done" onClick={() =>{handleMarkAsComplete(todo.id)}}>
                                    <CheckOutlined />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDialogOpen(todo.id)}>
                                        <DeleteIcon />
                                </IconButton>
                            </div> : 
                            todo.status == 'Complete' ? 
                            <Typography variant="body1" style={{padding:5,marginTop:20}}>Completed</Typography>
                            :
                            todo.cancelled == true ?
                            <Typography variant="body1"style={{padding:5,marginTop:20}}> Cancelled </Typography>
                            :<></>
                            }
                            </div>
                            <Divider variant="middle" />
                        </div>
                    ))}
                </List> : 
                <div className={classes.quoteStyle}>{getQuotes()} </div>
            }
            </Box>
            <TaskDetailsDialog open={taskDetailsDialogOpen} handleClose={handleTaskDetailsDialogClose} task={selectedTask} handleMarkAsCancelled={handleMarkAsCancelled} />
            {deleteDialogOpen ? handleDeleteDialog() :<></>}
        </div>
    );
};

export default TodoList;
