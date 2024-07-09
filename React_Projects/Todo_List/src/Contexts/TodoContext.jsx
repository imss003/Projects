import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
    {
        id: 1,
        name: "sleep",
        done: false
    }
    ],
    addTodo: (todo) => {},
    deleteTodo: (id) => {},
    updateTodo: (id, msg) => {},
    checkTodo: (id) => {}
})

export function useTodo(){
    return useContext(TodoContext)
}

export const ContextProvider = TodoContext.Provider;