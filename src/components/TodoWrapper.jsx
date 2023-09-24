import React, { useContext, useEffect, useState } from 'react';
import ToDoForm from './TodoForm';
import EditTodoForm from './EditTodoForm';
import {v4 as uuidv4} from 'uuid';
import Todo from './Todo';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
uuidv4();

const TodoWrapper = () => {

    const navigate = useNavigate();

    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(todos));
    },[todos])

    const addTodo = (todo) => {
        setTodos([...todos, {
            id: uuidv4(),
            task: todo,
            isEditing: false,
            completed: false
        }])
    }

    const toggleComplete = (id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTodo = (id) => {
        setTodos(todos.map(todo => todo.id===id ? {...todo, isEditing: !todo.isEditing} : todo));
    }

    const editTask = (value, id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, task: value, isEditing: !todo.isEditing} : todo))
    }

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        navigate('/login')

    }

   return (
    <>
        <div className='logout'>
            <button type='submit' className='logout-btn' onClick={handleLogout}> Logout </button>
        </div>
        <div className='TodoWrapper'>
            <h1>Get Things Done!, {user && user.username}</h1>
            <ToDoForm addTodo = {addTodo}/>
            {todos.map((todo, index) => (
                todo.isEditing ? ( <EditTodoForm editTask={editTask} task={todo}/> ) : 
                ( <Todo task = {todo} key = {index} toggleComplete={toggleComplete} editTodo={editTodo} deleteTodo={deleteTodo}/> )   
            ))}
        </div>
    </>
   )
}

export default TodoWrapper