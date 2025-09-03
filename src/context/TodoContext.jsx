import React from 'react'
import { createContext,useContext,useState } from 'react'


 const TodoContext = createContext();

 export function useTodos(){
    const context = useContext(TodoContext);
    if (!context){
        throw new Error("useTodos must be used within a TodoProvider");
    }
    return context
 }

 export function TodoProvider({children}) {
    const[todos , setTodos] = useState([]);

    const addTodo =(text) =>{
        const newTodo = {
            id: Date.now(),
            text,
            completed: false
        }
        setTodos([...todos, newTodo]);
    }

    const toggleTodo =(id) =>{
        setTodos(
            todos.map(todo=>
                todo.id === id ? {...todo ,completed: !todo.completed} :todo
            )
        )
    }

    const deleteTodo = (id) =>{
            setTodos(todos.filter(todo => todo.id !== id))
    }

    const value ={
        todos,
        addTodo,
        toggleTodo,
        deleteTodo
    }

  return (
    <TodoContext.Provider value={value}>
        {children}
    </TodoContext.Provider>
  )
}
