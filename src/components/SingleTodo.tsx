import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../lib/todoModel';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  index: number;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, index }) => {


  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDelete = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.filter(curr_todo => curr_todo.id !== id));
  };

  const handleEditState = (e: React.FormEvent) => {
    e.preventDefault();
    setEdit(edit => !edit);
  };

  const handleEditTodo = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setEdit(edit => !edit);

    setTodos(todos.map(curr_todo => (
      curr_todo.id === id ? { ...curr_todo, todo: editTodo } : curr_todo
    )));
  };

  const editTodoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editTodoRef.current?.focus();
  }, [edit]);



  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {
        (provided, snapshot) => (
            <form
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className={`w-full p-2 border-[1px] border-black my-2 ${todo.isDone ? "bg-green-400" : "bg-red-400" } ${snapshot.isDragging ? "shadow-2xl" : ""}`}
                key={todo.id}
              >

              {
                edit ? (
                  <input ref={editTodoRef} type="text" value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
                ) : (
                  <h1 className="text-2xl">Todo: {todo.todo}</h1>
                )
              }

              <p>Todo ID: {todo.id}</p>
              <p>Todo Status: {todo.isDone ? "True" : "False"}</p>

              <div className="flex flex-row mt-4 w-fit md:w-full md:justify-center">
                <button className={`p-2 border-[1px] border-black ${edit ? "hidden" : "inline"}`} onClick={(e) => handleEditState(e)}>
                  Edit
                </button>
                <button className={`p-2 border-[1px] border-black ${edit ? "inline" : "hidden"}`} onClick={(e) => handleEditTodo(e, todo.id)}>
                  Submit Change
                </button>
                <button className="p-2 border-[1px] ml-2 border-black"
                  onClick={(e) => handleDelete(e, todo.id)}
                >
                  Delete
                </button>
              </div>
            </form>
        )
      }

    </Draggable>
  )
}

export default SingleTodo;