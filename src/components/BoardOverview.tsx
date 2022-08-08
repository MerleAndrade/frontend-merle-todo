import {Todo} from "../model/Todo";
import Board from "./Board";

type BoardOverviewProps = {
    todos: Todo[],
    advanceTodo : (todo: Todo) => void,
    deleteTodo :(id: string) => void
}


export default function BoardOverview(props: BoardOverviewProps){

    const openTodos: Todo[] = props.todos.filter((currentTodo) => currentTodo.status === "OPEN");
    const inProgressTodos: Todo[] = props.todos.filter((currentTodo) => currentTodo.status === "IN_PROGRESS");
    const doneTodos: Todo[] = props.todos.filter((currentTodo) => currentTodo.status === "DONE");


    return(

        <div>
            <Board title ="Open" todos={openTodos} advanceTodo ={props.advanceTodo} deleteTodo={props.deleteTodo}/>
            <Board title ="IN Progress" todos={inProgressTodos} advanceTodo ={props.advanceTodo} deleteTodo={props.deleteTodo}/>
            <Board title ="Done" todos={doneTodos} advanceTodo ={props.advanceTodo} deleteTodo={props.deleteTodo}/>


        </div>
    )
}