import React from "react";
import { Todo } from "../lib/todoModel";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {


    return (
        <div className="w-screen p-4">
            <div className="w-full md:flex md:text-center md:space-x-2 space-y-2 md:space-y-0">
                <Droppable droppableId="TodosActive">
                    {
                        (provided) => (
                            // Active Todos
                            <div className="w-full h-fit p-2 bg-yellow-200 shadow-md rounded-md" ref={provided.innerRef} {...provided.droppableProps}>
                                <h1>Active Todos</h1>
                                {todos?.map((curr_todo, index) => (
                                    <SingleTodo key={curr_todo.id} index={index} todo={curr_todo} todos={todos} setTodos={setTodos} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )
                    }

                </Droppable>
                <Droppable droppableId="TodosComplete">
                    {
                        (provided) => (
                            // Completed Todos
                            <div className="w-full h-fit p-2 bg-teal-200 shadow-md rounded-md" ref={provided.innerRef} {...provided.droppableProps}>
                                <h1>Completed Todos</h1>
                                {completedTodos?.map((curr_todo, index) => (
                                    <SingleTodo key={curr_todo.id} index={index} todo={curr_todo} todos={completedTodos} setTodos={setCompletedTodos} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )
                    }

                </Droppable>
            </div>
        </div>
    );
};

export default TodoList;
