import {useEffect, useState} from "react";
import {Todo} from "../model/Todo";
import axios from "axios";
import {getNextStatus} from "../service/todo-service";

export function useTodos () {

    const [todos, setTodos] = useState<Todo[]>([]);

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
        return axios.post<Todo>("/api/todo", newTodo)
            .then((response) => {
            getAllTodos()
            return response.data
        })
    }

    const advanceTodo = (todo: Todo) => {
        const updateTodo = {
            id: todo.id,
            description: todo.description,
            status: getNextStatus(todo.status)
        }
        axios.put(`/api/todo/${todo.id}`, updateTodo)
            .then(getAllTodos)
    }

    const deleteTodo = (id: string) => {
        axios.delete(`/api/todo/${id}`)
            .then(getAllTodos)
    }

    return {todos, addTodo, advanceTodo, deleteTodo}

}

