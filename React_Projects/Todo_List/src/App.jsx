import { useEffect, useRef, useState } from 'react'
import Header from './Components/Header'
import Content from './Components/Content'
import Filtering from './Components/Filtering'
import AddItem from './Components/AddItem'
import { ContextProvider, TodoContext, useTodo } from './Contexts/TodoContext'
import { themeProvider } from './Contexts/ThemeContext'

function App() {
    const [todos, setTodos] = useState([]);
    const [editable, setEditable] = useState(false);
    const [filter, setFilter] = useState('all');
    const [updatedname, setUpdatedname] = useState("");
    const [editID, setEditID] = useState(0);
    const [theme, setTheme] = useState("light");

    useEffect(() => {
      console.log("called");
      
      const temptodo = localStorage.getItem("localStore");
      if(JSON.parse(temptodo).length > 0){
        setTodos(JSON.parse(temptodo));
      }
    }, [])
    useEffect(() => {
      // console.log("changed todo is: ", todos);
      localStorage.setItem("localStore", JSON.stringify(todos));
    },[todos])

    const inputref = useRef();
    const takeref = useRef();
    
    const editTodo = (todo) => {
      setUpdatedname(todo.name);
      setEditable(true);
      console.log(`updated name is ${updatedname}`);
      // if(takeref.current !== undefined){
      //   console.log("takeref is: ",takeref.current)
      //   takeref.current.focus();
      //   takeref.current.select();
      // }
      
    }

    const updateTodo = (id, msg) => {
      setTodos((prevTodo) => (prevTodo.map((item) => {
        if (item.id === id) {
          item.name = msg;
          return item;
        }
        return item;
      })))
      
    }
    const addTodo = (todo) => {
      if(!todo){
        return;
      }
      console.log("added");
      setTodos([...todos, todo]);
    }
    const deleteTodo = (id) => {
      console.log('clicked');
      setTodos((prevTodo) => (prevTodo.filter((item) => (item.id !== id))))
    }
    const checkTodo = (id) => {
      // console.log("changed for id", id);
      setTodos((prevTodo) => (prevTodo.map((item) => (item.id === id ? {...item, done: !item.done} : item))))
      
    }
    return (
      <themeProvider value = {{theme}}>
      <ContextProvider value={{todos, updateTodo, addTodo, deleteTodo, checkTodo}}>
        <div
          className='flex justify-center h-screen w-full items-center '
        >
          <button>
            
          </button>
          <div
            className='h-4/5 w-4/5 flex flex-col items-center bg-gray-700/80 rounded-md'
            
          >
            <Header
            />
            <AddItem
              inputref={inputref}
            />
            <Filtering
              setFilter={setFilter}
            />
            <div
              className='w-full h-full flex justify-center overflow-auto'
            >
              <Content
                array = {todos.filter((todo) => (filter === "active" ? todo.done  === false : filter === "completed" ? todo.done === true : todo))}
                editable = {editable}
                setEditable = {setEditable}
                updatedname = {updatedname}
                setUpdatedname = {setUpdatedname}
                editID = {editID}
                setEditID = {setEditID}
                editTodo = {editTodo}
                takeref = {takeref}
                inputref = {inputref}
              />
            </div>
          </div>
        </div>
      </ContextProvider>
      </themeProvider>
    )
}

export default App
