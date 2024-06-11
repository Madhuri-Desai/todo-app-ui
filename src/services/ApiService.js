import axios from 'axios';

const API_URL = 'http://localhost:5010';

const getTodos = () => axios.get(`${API_URL}/getAllTasks`);
const getTodo = (id) => axios.get(`${API_URL}/getTask/${id}`);
const createTodo = (todo) => axios.post(`${API_URL}/addTask`, todo);
const updateTodo = (id, todo) => axios.put(`${API_URL}/editTask/${id}`, todo);
const updateTodoStatus=(id,todo) => axios.put(`${API_URL}/updateTaskStatus/${id}`,todo)
const updateTodoCancellation=(id,todo) => axios.put(`${API_URL}/updateTaskCancellation/${id}`,todo)
const deleteTodo = (id) => axios.delete(`${API_URL}/delete/${id}`);
const addReminder =(id,reminder) => axios.post(`${API_URL}/tasks/${id}/reminders`,reminder)

export { getTodos, getTodo, createTodo, updateTodo, updateTodoStatus, updateTodoCancellation, deleteTodo, addReminder };
