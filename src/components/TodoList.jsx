import React from 'react'
import { useTodos } from '../context/TodoContext';
import TodoIteam from './TodoIteam';

function TodoList() {

  const {todos = []} = useTodos();

  if (todos.length === 0) {
   return(
     <div className='text-center py-4 text-gray-500'>
      No todos available. Please add some tasks.
   </div>
   )
  }

  return (
    <>
    <ul className='space-y-3'>
      {todos.map(todo =>(
        <TodoIteam key ={todo.id } todo={todo}/>
      ))}
    </ul>
    </>
  )
}

export default TodoList