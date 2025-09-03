import React from 'react'
import './App.css'
import AddTodoForm from './components/AddTodoForm'
import TodoList from './components/TodoList'
import { TodoProvider } from './context/TodoContext'

function App() {

  return (
    <>
    <TodoProvider>
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4'>
      <div className='max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6'>
        <h1 className='text-4xl font-bold text-center text-indigo-600 mb-8'>My To-Do List</h1>

      </div>
      <AddTodoForm />
      <TodoList />
    </div>
    </TodoProvider>
    </>
  )
}

export default App
