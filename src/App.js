import React from 'react';
import './App.css';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import AddTodo from './components/AddTodo';
import TodoEdit from './components/TodoEdit';
import Wrapper from './components/Wrapper';

function App(){
  return (
    <div className="App">
      <Router>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#e6d5f0',
          }}
        >
          <Routes>
              <Route path="/" exact element={<Wrapper />} />
              <Route path='/new' element={<AddTodo />} />
              <Route path='/edit/:id' element={<TodoEdit />} />
          </Routes>
        </Box>
      </Router>

    </div>
  );
}

export default App;
