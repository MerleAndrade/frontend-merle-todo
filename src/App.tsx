import React, {useEffect, useState} from 'react';
import './App.css';
import {Todo} from "./model/Todo";
import BoardOverview from "./components/BoardOverview";
import axios from "axios";
import AddTodo from "./components/AddTodo";
import {getNextStatus} from "./service/todo-service";

function App() {

const [todos, setTodos] = useState <Todo[]>([]);

useEffect(() => {
    getAllTodos()
}, [])

const getAllTodos = () => {
    axios.get("/api/todo")
        .then((response) => response.data)
        .then((data) => setTodos(data))
}

const addTodo = (description: string) => {
    const newTodo = {
        description: description,
        status: "OPEN"
    }
    axios.post("/api/todo", newTodo)
        .then(getAllTodos)
}
 const advanceTodo = (todo: Todo) => {
    const updateTodo ={
        id: todo.id,
        description: todo.description,
        status: getNextStatus(todo.status)
    }
    axios.put(`/api/todo/${todo.id}`, updateTodo)
        .then(getAllTodos)
 }



return (
    <div>
      <BoardOverview todos = {todos} advanceTodo={advanceTodo}/>
        <AddTodo addTodo ={addTodo}/>
    </div>
  );
}

export default App;
