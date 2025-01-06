
import { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;

    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex mb-4">
      <input
        type="text"
        placeholder="Write your task here..."
        className="w-full border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-gray-800 shadow-md"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-6 py-2 bg-blue-600 text-white font-semibold transition-all hover:bg-blue-700 duration-200 shadow-md"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;

