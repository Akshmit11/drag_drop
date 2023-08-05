import React, { useState } from "react";
import { Todo } from "./lib/todoModel";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      let currTodo: Todo = {
        id: Date.now(),
        todo: todo,
        isDone: false,
      };

      setTodos([...todos, currTodo]);
      setTodo("");
    }

  }

  const onDragEnd = (result: DropResult) => {
    // console.log(result);
    const { source, destination } = result;

    if(!destination) return;
    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    let active, complete;
    active = todos;
    complete = completedTodos;
    
    let add;
    if(source.droppableId === "TodosActive") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if(destination.droppableId === "TodosActive") {
      active.splice(destination.index, 0, {...add, isDone: false});
    } else {
      complete.splice(destination.index, 0, {...add, isDone: true});
    }

  };

  return (

    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-screen h-screen flex flex-col items-center bg-blue-100">
        <div className="mt-10 z-10">
          <h1 className="uppercase text-4xl">Taskify</h1>
        </div>

        <form className="my-10 flex items-center w-full justify-center space-x-2" onSubmit={handleAddTask}>
          <input type="text" name="" placeholder="Enter a task" id=""
            className="px-3 py-1 mx-3 rounded-md w-2/3 sm:w-1/5 text-center"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit" className="border-[1px] rounded-md border-black px-2 py-1">Add</button>
        </form>

        {
          <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos} />
        }

      </div>
    </DragDropContext>
  )
}

export default App