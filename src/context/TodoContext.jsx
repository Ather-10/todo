import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

const TodoContext = createContext();

export function useTodos() {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodos must be used within a TodoProvider");
    }
    return context;
}

export function TodoProvider({ children }) {
    const [todos, setTodos] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false); // Add loading state

    // Load todos from localStorage when component mounts
    useEffect(() => {
        try {
            const savedTodos = localStorage.getItem('todos');
           // console.log('Loading from localStorage:', savedTodos);
            
            if (savedTodos && savedTodos !== 'undefined') {
                const parsedTodos = JSON.parse(savedTodos);
                if (Array.isArray(parsedTodos)) {
                    setTodos(parsedTodos);
                }
            }
        } catch (error) {
          //  console.error('Failed to load todos from localStorage:', error);
        } finally {
            setIsLoaded(true); // Mark as loaded regardless of success/error
        }
    }, []);

    // Save todos to localStorage whenever they change
    useEffect(() => {
        if (isLoaded) { // Only save after initial load
            try {
               // console.log('Saving to localStorage:', todos);
                localStorage.setItem('todos', JSON.stringify(todos));
            } catch (error) {
               // console.error('Failed to save todos to localStorage:', error);
            }
        }
    }, [todos, isLoaded]); // Add isLoaded as dependency

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text,
            completed: false
        }
        setTodos([...todos, newTodo]);
    }

    const toggleTodo = (id) => {
        setTodos(
            todos.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const value = {
        todos,
        isLoaded, // Export isLoaded so components can check if data is ready
        addTodo,
        toggleTodo,
        deleteTodo
    }

    // Optional: Show loading indicator while data is being loaded
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}