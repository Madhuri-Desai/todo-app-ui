import { Paper, Typography,Box } from '@mui/material'
import React,{useState,useEffect} from 'react'
import { getTodos } from '../services/ApiService'
import TodoList from './TodoList'

const Wrapper = () => {
    const [completed, setCompleted] = useState(0)
    const [cancelledTasks, setCancelledTasks] = useState(0)
    const [totalTasks, setTotalTasks] = useState(0)
    const [activeTasks , setActiveTasks] = useState(0)
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await getTodos();
        var data = response.data;
        setCompleted(data.filter(x => x.status == 'Complete').length)
        setTotalTasks(data.length)
        setCancelledTasks(data.filter(x => x.cancelled == true).length)
        setActiveTasks(data.filter(x=> x.status != 'Complete' && x.cancelled == false ).length)
    };

  return (
    <div>
        {totalTasks > 0 ?
        <div>
            <Box sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    maxHeight: 200,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    padding: 2,
                    boxShadow: 3,
                }}>
            <Typography variant='h3'>Tasks Done</Typography>            
            <div style={{display:'flex'}}>
                <Typography variant='body2' style={{padding:5}}>Total : {totalTasks}</Typography>
                <Typography variant='body2' style={{padding:5}}>Active : {activeTasks}</Typography>
                <Typography variant='body2' style={{padding:5}}>Completed : {completed}</Typography>
                <Typography variant='body2' style={{padding:5}}>Cancelled : {cancelledTasks}</Typography>
            </div> 
            </Box> 
        </div>
        : <></>
        }
            <TodoList />        
    </div>
  )
}

export default Wrapper
