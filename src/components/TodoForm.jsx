import React from 'react';
import { useState } from 'react';

const ToDoForm = ({addTodo}) => {

    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!value) return // if no value
        addTodo(value);
        setValue("");
    }

    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input type='text' className='todo-input' value={value} placeholder='What are you upto today?' onChange={((e) => setValue(e.target.value))}/>
            <button type='submit' className='todo-btn'> Add Task </button>
        </form>
    )
}

export default ToDoForm;