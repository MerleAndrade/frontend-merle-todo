import React, {useEffect, useState} from 'react';
import './App.css';
import {Todo} from "./model/Todo";
import BoardOverview from "./components/BoardOverview";
import axios from "axios";

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


return (
    <div>
      <BoardOverview todos = {todos}/>
    </div>
  );
}

export default App;
