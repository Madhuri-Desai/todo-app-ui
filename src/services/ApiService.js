import axios from 'axios';

const API_URL = 'http://localhost:5010';

const getTodos = () => axios.get(`${API_URL}/getAllTasks`);
const getTodo = (id) => axios.get(`${API_URL}/getTask/${id}`);
const createTodo = (todo) => axios.post(`${API_URL}/addTask`, todo);
const updateTodo = (id, todo) => axios.put(`${API_URL}/editTask/${id}`, todo);
const updateTodoStatus=(id,todo) => axios.put(`${API_URL}/updateTaskStatus/${id}`,todo)
const updateTodoCancellation=(id,todo) => axios.put(`${API_URL}/updateTaskCancellation/${id}`,todo)
const deleteTodo = (id) => axios.delete(`${API_URL}/delete/${id}`);
const updateReminder = (userId, reminderTime) => axios.put(`${API_URL}/users/${userId}/reminder`, { reminder_time: reminderTime });
const createUser = (user) => axios.post(`${API_URL}/users`, user);

export { getTodos, getTodo, createTodo, updateTodo, updateTodoStatus, updateTodoCancellation, deleteTodo, updateReminder, createUser };
