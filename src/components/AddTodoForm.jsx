import React, { useState } from 'react'
import { useTodos } from '../context/TodoContext';

function AddTodoForm() {
    const[inputvalue, setInputValue] = useState('');
    const {addTodo} = useTodos();

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(inputvalue.trim()){
            addTodo(inputvalue);
            setInputValue('');
        }

    }      
  return (
   <>
   <form onSubmit={handleSubmit} className='mb-6 mt-2'>
    <div className='flex gap-2'>
        <input
         type="text" placeholder='Enter your Tasks'
         value={inputvalue}
         onChange={(e =>setInputValue( e.target.value))} 
         className='flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
         />

         <button type='submit' className='px-4 py-2 bg-indigo-600 text-white font-semibold rounded-r-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500'>
            Add
         </button>
    </div>
   </form>
   
   </>
  )
}

export default AddTodoForm